/* generic XHR request */
function request(url, cb) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(null, xhr.responseText)
        } else {
            cb("error" + xhr.responseType)
        }
    }
    xhr.open("GET", url, true)
    xhr.send()
}
var container = document.getElementById('showContainer');
var addNoteForm = document.getElementById('add-todo');
///////////////////////////////////////////////////////////////////////////////////////////////
(function() {


    state = JSON.parse(localStorage.getItem('newState'));


    var createNoteNode = function(note) {
        var noteNode = document.createElement('li');
        noteNode.id = note.id;

        var spanDescription = document.createElement('span');
        spanDescription.textContent = note.description;
        noteNode.appendChild(spanDescription);


        var deleteButtonNode = document.createElement('button');
        deleteButtonNode.setAttribute("title", "del");
        var txt = document.createTextNode("\ ");
        deleteButtonNode.addEventListener('click', function(event) {
            var newState = noteFunctions.deleteNote(state, note.id);
            localStorage.setItem('newState', JSON.stringify(newState));
            update(newState);
        });
        deleteButtonNode.className = "close";
        deleteButtonNode.appendChild(txt);
        noteNode.appendChild(deleteButtonNode);


        return noteNode;
    };

    if (addNoteForm) {
        addNoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var newDescription = document.getElementsByName("description")[0].value;
            if (/\S/.test(newDescription)) {
                var noteObject = {
                    description: newDescription
                };
                var newState = noteFunctions.addNote(state, noteObject);
                localStorage.setItem('newState', JSON.stringify(newState));

                update(newState);

                document.getElementsByName("description")[0].value = "";
            } else {
                alert("Empty inputs not allowed!");
            }
            i
        });
    }

    var update = function(newState) {
        state = JSON.parse(localStorage.getItem('newState'));
        renderState(state);
    };

    var renderState = function(state) {
        var noteListNode = document.createElement('ul');

        state.forEach(function(note) {
            noteListNode.appendChild(createNoteNode(note));
        });
        container.replaceChild(noteListNode, container.firstChild);
    };

    if (container) renderState(state);
})();
var noteFunctions = {
    generateId: (function() {
        var idCounter = 0;

        function incrementCounter() {
            return (idCounter += 1);
        }

        return incrementCounter;
    })(),
    addNote: function(notes, newNote) {
        var newId = this.generateId();
        var newItem = {
            id: newId,
            description: newNote.description,
            done: false
        };
        return notes.concat([newItem]);
    },
    deleteNote: function(notes, idToDelete) {
        var newArray = notes.map(function(el) {
            return Object.assign({}, el);
        });
        return newArray.filter(function(el) {
            return el.id !== idToDelete;
        });
    },
}

//////////////////////////////////////////////////////////////////////////////////


// function updateDom(err, data) {
//     if (err) {
//         console.log(err)
//     } else {
//         var result = JSON.parse(data)
//         var stable = document.getElementById("s-table")
//         var ctable = document.getElementById("c-table")
//         var gtable = document.getElementById("g-table")

//         result.forEach(function(rs) {
//             var row1 = document.createElement("tr")
//             var stoptd = document.createElement("td")
//             var user = document.createElement("td")
//             stoptd.innerHTML = rs.text
//             user.innerHTML = rs.name
//             row1.appendChild(stoptd)
//             row1.appendChild(user)
//             stable.appendChild(row1)

//             var row2 = document.createElement("tr")
//             var conttd = document.createElement("td")
//             var user2 = document.createElement("td")
//             conttd.innerHTML = rs.text
//             user2.innerHTML = rs.name
//             row2.appendChild(conttd)
//             row2.appendChild(user2)
//             ctable.appendChild(row2)

//             var row3 = document.createElement("tr")
//             var gotd = document.createElement("td")
//             var user3 = document.createElement("td")
//             gotd.innerHTML = rs.text
//             user3.innerHTML = rs.name
//             row3.appendChild(gotd)
//             row3.appendChild(user3)
//             gtable.appendChild(row3)
//         })
//     }
// }

// request('/users', updateDom)