const nameInput = document.getElementById("nameInput")
const idInput = document.getElementById("idInput")
const emailInput = document.getElementById("emailInput")
const classInput = document.getElementById("classInput")
const studentTableBody = document.getElementById("findStudentBody")
const addStudentBtn = document.getElementById("addStudent")
const findStudent = document.getElementById("searchInput")

function searchStudent() {
    studentTableBody.innerHTML = ""
    const studentName = document.getElementById("searchInput").value.toLowerCase()
    const students = getStudentsFromLocalStorage()
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(studentName)
    )

    filteredStudents.forEach((student, index) => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.className}</td>
            <td>
                <button onclick="editStudent(${index})" class="edit-btn">Sửa</button>
                <button onclick="deleteStudent(${index})" class="delete-btn">Xoá</button>
            </td>
        `
        studentTableBody.appendChild(row)
    })
}

findStudent.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchStudent()
    }
})

function saveStudentsToLocalStorage(students) {
    localStorage.setItem("students", JSON.stringify(students)) 
}

function getStudentsFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("students"))
    return Array.isArray(data) ? data : [] 
}

const validateInputStudent = () => {
    let name = document.getElementById("nameInput").value
    let id = document.getElementById("idInput").value 
    let rexEXID = /^SV[0-9]{3}$/
    let email = document.getElementById("emailInput").value
    let className = document.getElementById("classInput").value
    let flag = true
    
    if (id.trim() == "") {
        document.getElementById("idStatus").innerHTML = "<p style='color: red;'>Không được để trống id sinh viên!</p>"
        flag = false
    } else if(!rexEXID.test(id)) {
        document.getElementById("idStatus").innerHTML = "<p style='color: red;'>Id sinh viên không hợp lệ, phải bắt đầu bằng MS và có 3 chữ số!</p>"
        flag = false
    }   
   
    else {
        document.getElementById("idStatus").innerText = ""
    }

    if(name.trim() == "") {
        document.getElementById("nameStatus").innerHTML = "<p style='color: red;'>Không được để trống tên sinh viên!</p>"
        flag = false
    } else {
        document.getElementById("nameStatus").innerText = ""
    }
    
    if(email.trim() == "") {
        document.getElementById("emailStatus").innerHTML = "<p style='color: red;'>Không được để trống email sinh viên!</p>"
        flag = false
    } else if(!email.includes("@") || email.includes(" ")) 
        {
            document.getElementById("emailStatus").innerHTML = "<p style='color: red;'>Email không hợp lệ, phải chứa @ và không có dấu cách!</p>"
            flag = false
        }
    
    else {
        document.getElementById("emailStatus").innerText = ""
    }

    if (classTest.trim() == "") {
        document.getElementById("classStatus").innerHTML = "<p style='color: red;'>Không được để trống lớp sinh viên!</p>"
        flag = false
    } else {
        document.getElementById("classStatus").innerText = ""
    }

    return flag ? { name, id, email, className } : null 
}

addStudentBtn.addEventListener("click", function () {
    let student = validateInputStudent() 
    if (student) {
        const students = getStudentsFromLocalStorage() 
        students.push(student) 
        saveStudentsToLocalStorage(students)
        loadListStudents() 
        nameInput.value = "" 
        idInput.value = "" 
        emailInput.value = "" 
        classInput.value = "" 
    }   
}) 

function loadListStudents() {
    studentTableBody.innerHTML = "" 

    const students = getStudentsFromLocalStorage() 

    students.forEach((student, index) => {
        const row = document.createElement("tr") 

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.className}</td>
            <td>
                <button onclick="editStudent(${index})" class="edit-btn">Sửa</button>
                <button onclick="deleteStudent(${index})" class="delete-btn">Xoá</button>
            </td>
        ` 

        studentTableBody.appendChild(row) 
    }) 
}


function deleteStudent(index) {
    const students = getStudentsFromLocalStorage()
    let choice = confirm("Bạn có chắc muốn xoá sinh viên này?")
    if (!choice) {
        return 
    }
    students.splice(index, 1) 
    saveStudentsToLocalStorage(students) 
    alert("Đã xoá sinh viên thành công!")
    loadListStudents() 
}

function editStudent(index) {
    const students = getStudentsFromLocalStorage() 
    const student = students[index] 
    const name = prompt("Nhập tên sinh viên:", student.name) 
    const id = prompt("Nhập mã số sinh viên:", student.id) 
    const email = prompt("Nhập email sinh viên:", student.email) 
    const className = prompt("Nhập tên lớp sinh viên:", student.className) 
    if (!name || !id || !email || !className) {
        alert("Vui lòng điền đầy đủ thông tin!") 
        return 
    }
    students[index] = { name, id, email, className } 
    saveStudentsToLocalStorage(students) 
    loadListStudents() 
}

loadListStudents() 
