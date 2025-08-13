class AssetManagement {
    constructor() {
        this.userId = localStorage.getItem('userId');
        this.userRole = localStorage.getItem('userRole');
    }

    async getAssetList() {
        try {
            // Implement API call to get asset list from Google Sheets
            const assets = await this.fetchAssets();
            return assets;
        } catch (error) {
            console.error('Error fetching assets:', error);
            return [];
        }
    }

    async createAsset(assetData) {
        if (this.userRole !== 'admin') {
            alert('Unauthorized action');
            return false;
        }

        try {
            // Implement API call to create new asset
            await this.saveAsset(assetData);
            alert('Aset berhasil ditambahkan');
            return true;
        } catch (error) {
            console.error('Error creating asset:', error);
            alert('Gagal menambahkan aset');
            return false;
        }
    }

    async borrowAsset(assetId, borrowData) {
        try {
            const borrowRequest = {
                assetId: assetId,
                userId: this.userId,
                borrowDate: new Date().toISOString(),
                returnDate: borrowData.returnDate,
                purpose: borrowData.purpose,
                status: 'BORROWED'
            };

            // Implement API call to record asset borrowing
            await this.saveBorrowRecord(borrowRequest);
            alert('Peminjaman aset berhasil');
            return true;
        } catch (error) {
            console.error('Error borrowing asset:', error);
            alert('Gagal meminjam aset');
            return false;
        }
    }

    async returnAsset(assetId) {
        try {
            const returnData = {
                assetId: assetId,
                userId: this.userId,
                returnDate: new Date().toISOString(),
                status: 'RETURNED'
            };

            // Implement API call to record asset return
            await this.saveReturnRecord(returnData);
            alert('Pengembalian aset berhasil');
            return true;
        } catch (error) {
            console.error('Error returning asset:', error);
            alert('Gagal mengembalikan aset');
            return false;
        }
    }

    // API integration methods (implement these according to your Google Sheets setup)
    async fetchAssets() {
        // Implement Google Sheets API call
        console.log('Fetching assets');
    }

    async saveAsset(data) {
        // Implement Google Sheets API call
        console.log('Saving asset:', data);
    }

    async saveBorrowRecord(data) {
        // Implement Google Sheets API call
        console.log('Saving borrow record:', data);
    }

    async saveReturnRecord(data) {
        // Implement Google Sheets API call
        console.log('Saving return record:', data);
    }
}