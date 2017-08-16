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
function updateDom(err, data) {
    if (err) {
        console.log(err)
    } else {
        var result = JSON.parse(data)
        var stable = document.getElementById("s-table")
        var ctable = document.getElementById("c-table")
        var gtable = document.getElementById("g-table")

        result.forEach(function(rs) {
            var row1 = document.createElement("tr")
            var stoptd = document.createElement("td")
            var user = document.createElement("td")
            stoptd.innerHTML = rs.text
            user.innerHTML = rs.name
            row1.appendChild(stoptd)
            row1.appendChild(user)
            stable.appendChild(row1)

            var row2 = document.createElement("tr")
            var conttd = document.createElement("td")
            var user2 = document.createElement("td")
            conttd.innerHTML = rs.text
            user2.innerHTML = rs.name
            row2.appendChild(conttd)
            row2.appendChild(user2)
            ctable.appendChild(row2)

            var row3 = document.createElement("tr")
            var gotd = document.createElement("td")
            var user3 = document.createElement("td")
            gotd.innerHTML = rs.text
            user3.innerHTML = rs.name
            row3.appendChild(gotd)
            row3.appendChild(user3)
            gtable.appendChild(row3)
        })
    }
}

request('/submit', updateDom)
