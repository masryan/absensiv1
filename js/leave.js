class LeaveManagement {
    constructor() {
        this.userId = localStorage.getItem('userId');
        this.userRole = localStorage.getItem('userRole');
    }

    async submitLeaveRequest(formData) {
        try {
            const leaveRequest = {
                idPPNPN: this.userId,
                submitDate: new Date().toISOString(),
                startDate: formData.startDate,
                endDate: formData.endDate,
                leaveType: formData.leaveType,
                reason: formData.reason,
                status: 'PENDING'
            };

            // Save to Google Sheets (implement API call)
            await this.saveLeaveRequest(leaveRequest);
            alert('Pengajuan cuti berhasil disubmit');
            return true;
        } catch (error) {
            console.error('Error submitting leave request:', error);
            alert('Gagal mengajukan cuti');
            return false;
        }
    }

    async getLeaveBalance() {
        try {
            // Implement API call to get leave balance from Google Sheets
            const balance = await this.fetchLeaveBalance(this.userId);
            return balance;
        } catch (error) {
            console.error('Error fetching leave balance:', error);
            return null;
        }
    }

    async approveLeaveRequest(requestId, status) {
        if (this.userRole !== 'admin') {
            alert('Unauthorized action');
            return false;
        }

        try {
            // Implement API call to update leave request status
            await this.updateLeaveStatus(requestId, status);
            alert('Status cuti berhasil diupdate');
            return true;
        } catch (error) {
            console.error('Error updating leave status:', error);
            alert('Gagal mengupdate status cuti');
            return false;
        }
    }

    // API integration methods (implement these according to your Google Sheets setup)
    async saveLeaveRequest(data) {
        // Implement Google Sheets API call
        console.log('Saving leave request:', data);
    }

    async fetchLeaveBalance(userId) {
        // Implement Google Sheets API call
        console.log('Fetching leave balance for user:', userId);
    }

    async updateLeaveStatus(requestId, status) {
        // Implement Google Sheets API call
        console.log('Updating leave status:', requestId, status);
    }
}