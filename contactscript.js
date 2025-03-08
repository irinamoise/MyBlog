window.onload = function() {

    alert('Nu uita să lasi un feedback!');

    // Generare culoare aleatorie
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        //folosire getcomputedstyle pentru a prelua culoarea butonului si a o compara cu verde
        //daca culoarea butonului este verde, nu se va schimba culoarea butonului la apelul functiei getRandomColor()
        var buton = document.getElementById('subscribeButton');
        var stil = window.getComputedStyle(buton);
        if(stil.backgroundColor == 'rgb(0, 128, 0)i'){
            return stil.backgroundColor;
        }
        
        return color;
    }

    // Schimbare culoare buton la un interval de timp
    setInterval(function() {
        //schimbare culoare buton
        document.getElementById('subscribeButton').style.backgroundColor = getRandomColor();
          
    }, 1000); 

    //Activare buton abonat dupa apasare
    document.getElementById('subscribeButton').addEventListener('click', function() {
        document.getElementById('subscribeButton').disabled = true;
        document.getElementById('subscribeButton').innerText = 'Abonat';
        //schimbare culoare buton
        document.getElementById('subscribeButton').style.backgroundColor = 'green';
    });

    document.getElementById('feedbackForm').addEventListener('submit', function(event) {
        event.preventDefault();

        
        var name = document.getElementById('nameInput').value;
        var nameRegex = /^[a-zA-Z\s]*$/;
        if (!nameRegex.test(name)) {
            alert('Numele poate conține doar litere și spații.');
            return;
            
        }

        var feedback = document.getElementById('feedbackInput').value;
        if (feedback.trim() === '') {
            alert('Feedbackul nu poate fi gol.');
            return;
        
        }

        // Validează ratingul (un număr între 1 și 5)
        var rating = document.getElementById('ratingInput').value;
        var ratingRegex = /^(5|6|7|8|9|10)$/;;
        if (!ratingRegex.test(rating)) {
            alert('Sunteti obligati sa-mi acordati o nota de promovare ))');
            return;
            
        }

        alert('Multumesc pt feedback, ' + name + '!');

        var httpRequest;
        var myform = document.getElementById("feedbackForm");
        myform.onsubmit = function (event){
            event.preventDefault();
        
            var data = {name:document.getElementById("nameInput").value, 
                        feedback:document.getElementById("feedbackInput").value, 
                        rating:document.getElementById("ratingInput").value};
        
            httpRequest = new XMLHttpRequest(); // creează un obiect XMLHttpRequest
            if (!httpRequest) {
                alert('nu se poate crea o instanță XMLHTTP');
                return false;
            }
            
            httpRequest.onreadystatechange = alertContents;
            httpRequest.open('GET', feedbackForm.action, true);
            httpRequest.setRequestHeader("Content-Type", "feedback.json")
            httpRequest.send(JSON.stringify(data));
        }

        function alertContents() {
            if (httpRequest.readyState == 4) {
                if (httpRequest.status == 200) {

                var content = httpRequest.responseText;          
                alert(content);
                
                } else {
                    alert('A fost o problema cu request-ul.');
                }
            }
        }
        
    });

    // Afisare feedbackuri
    

    function makeRequest() {
        fetch("feedback.xml")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Afișează conținutul feedback-ului
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data, "text/xml");
                var feedbacks = xmlDoc.getElementsByTagName("feedback");
                var feedbackList = document.getElementById("feedbackList");
                feedbackList.innerHTML = '';

                for (var i = 0; i < feedbacks.length; i++) {
                    var name = feedbacks[i].getElementsByTagName("name")[0].textContent;
                    var rating = feedbacks[i].getElementsByTagName("rating")[0].textContent;
                    var feedbackText = feedbacks[i].getElementsByTagName("message")[0].textContent;

                    var feedbackItem = document.createElement('li');
                    feedbackItem.innerHTML = `<strong>${name}</strong> - nota acordată: ${rating}<br><span style="margin-left: 20px;">feedback: ${feedbackText}</span>`;
                    feedbackList.appendChild(feedbackItem);
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    document.getElementById("ajaxButton").addEventListener('click', makeRequest);


   
};
