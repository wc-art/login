/* 
    student.js
    数据操作文件模块
    职责：操作文件中的数据，只处理数据，不关心业务
*/

const { json } = require('body-parser')
let fs = require('fs')

let dbPath = './json/db.json'
/* 
    获取所有学生列表
    callback 中的参数
        第一个参数是 err
            成功时 null
            错误是错误对象
        第二个参数是 结果
            成功是 数组
            错误是 undefined
    return []
*/

// 查找学生
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        } else {
            let students = JSON.parse(data).students

            students.forEach((item, index) => {
                item.id = index + 1
            });

            let fileData = JSON.stringify({
                students
            })
            fs.writeFile(dbPath, fileData, (err, data) => {
                if (err) {
                    return callback(err)
                }
                callback(null)
            })

            callback(null, students)
        }
    })
}

exports.findByid = function (id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            throw err
        } else {

            let students = JSON.parse(data).students

            student = students.find((item) => {
                return item.id === id
            })
            callback(null, student)
        }
    })
}

// 添加保存学生
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        if (students.length === 0) {
            student.id = 1
        } else {
            student.id = students[students.length - 1].id + 1
        }
        // 保存到数组中
        // 获取当前具体时间操作
        let today = new Date()
        let [year, month, day, hour, min, sec] = [today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()]
        student.dateTime = `${year}-${month}-${day}   ${hour}:${min}:${sec}`
        students.push(student)
        let fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, (err, data) => {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

// 更新学生
exports.updateByid = function (student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        student.id = parseInt(student.id)
        let students = JSON.parse(data).students

        // 你要修改谁， 就需要把谁找出来
        // es6 中的一个数组方法
        // 需要接收一个函数作为参数
        // 但某个遍历项符合 item.id === student.id 条件的时候， find 会终止遍历， 同时返回遍历项
        let stu = students.find((item) => {
            return item.id === student.id
        })
        // 遍历拷贝对象
        for (let key in student) {
            stu[key] = student[key]
        }

        let fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, (err, data) => {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

// 删除学生
exports.delete = function (id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        id = parseInt(id)

        let students = JSON.parse(data).students

        let Id = students.findIndex((item) => item.id === id)

        students.splice(Id, 1)

        let fileData = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, fileData, (err, data) => {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

exports.login = function (student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            throw err
        }

        else {
            let flag = 0
            let students = JSON.parse(data).students
            students.map((item) => {
                if(student.username === item.username&& student.password === item.password) flag = 1
            })
            callback(null, flag, students)
        }

    })
}
