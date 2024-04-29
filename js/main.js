let app = new Vue({
    el: '#app',
    data: {
        todo: "",
        needDoList: [],
        needDoListDo: [],
        needDoListDone:[],
        schetchik: 0
    },
    methods: {
        addTask() {
            if (this.todo === "") {
                alert("Введите значение")
                return
            }
            if (this.needDoList.length >= 3) {
                alert("Больше 3 нельзя")
            } else {
                this.needDoList.push(this.todo);

            }
            this.todo.value = ""
        },
        schetRadio() {
            if (this.needDoListDo.length >= 5) {
                alert("Больше 5 нельзя")
                return
            } else {
                this.schetchik += 1
                if (this.schetchik >= 3 && this.schetchik < 5) {
                    this.needDoListDo.push(this.todo)
                    this.schetchik = 0
                    for (let element in this.needDoList) {
                        this.needDoList.splice(this.needDoList[element], 1)
                    }
                    this.needDoListDo.push(this.todo)
                    this.schetchik = 0

                }
            }

        },
        schetRadioDo() {
            this.schetchik += 1
            if (this.schetchik >= 2) {
                this.schetchik = 0
                this.needDoListDone.push(this.todo)
                for (let element in this.needDoListDo) {
                    this.needDoListDo.splice(this.needDoListDo[element], 1)
                }

            }
        }
    }
})