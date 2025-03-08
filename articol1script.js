alert('Nu uita să lași un comentariu!');
document.addEventListener('DOMContentLoaded', function() {
    //schimbare culoare buton dupa trimiterea comentariului
    document.getElementById('commentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        document.getElementById('submitButton').disabled = true;

        document.getElementById('submitButton').style.backgroundColor = 'blue';
        document.getElementById('submitButton').innerHTML = 'Comentariu trimis!';
        alert('Comentariul a fost trimis cu succes!')

         // Preia textul comentariului
         var commentText = document.getElementById('commentInput').value;

        // salveaza comentariul in localStorage
        var comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(commentText);
        localStorage.setItem('comments', JSON.stringify(comments));

         // Resetează inputul
         document.getElementById('commentInput').value = '';
    });

    document.getElementById('showCommentsButton').addEventListener('click', function() {

        var showCommentsButton = document.getElementById('showCommentsButton'); 
        if (showCommentsButton.style.backgroundColor === 'green') {
            var comments = JSON.parse(localStorage.getItem('comments')) || [];

            // Golește lista de comentarii
            var commentsList = document.getElementById('commentsList');
            commentsList.innerHTML = '';

            // Afișează fiecare comentariu
            comments.forEach(function(comment) {
                var newComment = document.createElement('li');
                newComment.textContent = comment;
                commentsList.appendChild(newComment);
            });

            // Schimbă textul și culoarea butonului
            
            showCommentsButton.style.backgroundColor = 'orange';
            showCommentsButton.innerText = 'Ascunde comentariile';
        }
        else {
            var commentsList = document.getElementById('commentsList');
            commentsList.innerHTML = '';

            showCommentsButton.style.backgroundColor = 'green';
            showCommentsButton.innerText = 'Arata comentariile';
        }
    
    });
});



