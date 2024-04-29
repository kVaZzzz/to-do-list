let app = new Vue({
    el: '#app',
    data: {
        todo: "",
        needDoList: [],
        needDoListDo: [],
        needDoListDone:[]
    },
    methods: {
        addTask(){
            this.needDoList.push(this.todo);
        },
        doCheck(){
            for(let element in this.needDoList) {
                this.needDoList.splice(this.needDoList[element], 1)
            }
            this.needDoListDo.push(this.todo)
        },
        doneCheck(){
            for(let element in this.needDoListDo) {
                this.needDoListDo.splice(this.needDoListDo[element], 1)
            }
            this.needDoListDone.push(this.todo)
        }
    }})
