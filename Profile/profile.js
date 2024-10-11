const storedAccount = JSON.parse(sessionStorage.getItem('account'));
        const usernameDisplay = document.getElementById('username');
        
        if (storedAccount) {
            usernameDisplay.textContent = storedAccount.username;
        } else {
            usernameDisplay.textContent = 'No user logged in';
        }
        document.getElementById('logoutBtn').addEventListener('click', function() {
            sessionStorage.removeItem('account');
            sessionStorage.removeItem('isLoggedIn');
            alert('Anda telah logout!');
            window.location.href = '../index.html';
        });
        document.getElementById('editProfileBtn').addEventListener('click', function() {
            alert('Fitur ini sedang dalam pengembangan!');
        });

document.getElementById('homeBtn').addEventListener('click', function() {
    window.location.href = '../index.html';
});