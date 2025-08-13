class AttendanceSystem {
    constructor() {
        this.latitude = null;
        this.longitude = null;
        this.stream = null;
        this.officeLocation = {
            latitude: -6.306848,
            longitude: 107.306455,
            radius: 100 // meters
        };
    }

    async init() {
        try {
            // Get user's location
            const position = await this.getCurrentPosition();
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

            // Check if user is within office radius
            if (!this.isWithinOfficeRadius()) {
                throw new Error('Anda berada di luar radius kantor');
            }

            // Initialize camera
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.stream = stream;
            document.getElementById('camera-preview').srcObject = stream;
        } catch (error) {
            console.error('Error initializing attendance system:', error);
            alert(error.message);
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    isWithinOfficeRadius() {
        const distance = this.calculateDistance(
            this.latitude,
            this.longitude,
            this.officeLocation.latitude,
            this.officeLocation.longitude
        );
        return distance <= this.officeLocation.radius;
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = lat1 * Math.PI/180;
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }

    async captureAttendance(type) {
        try {
            // Capture photo
            const canvas = document.createElement('canvas');
            const video = document.getElementById('camera-preview');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const photoData = canvas.toDataURL('image/jpeg');

            // Prepare attendance data
            const attendanceData = {
                idPPNPN: localStorage.getItem('userId'),
                timestamp: new Date().toISOString(),
                type: type,
                location: {
                    latitude: this.latitude,
                    longitude: this.longitude
                },
                photo: photoData
            };

            // Send to server (implement your own API endpoint)
            await this.saveAttendance(attendanceData);

            alert(`${type === 'in' ? 'Check-in' : 'Check-out'} berhasil!`);
        } catch (error) {
            console.error('Error capturing attendance:', error);
            alert('Gagal melakukan absensi. Silakan coba lagi.');
        }
    }

    async saveAttendance(data) {
        // Implement your API call to Google Sheets here
        // You'll need to use Google Sheets API or Apps Script
        console.log('Saving attendance:', data);
    }

    cleanup() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }
}

// Initialize attendance system
const attendance = new AttendanceSystem();