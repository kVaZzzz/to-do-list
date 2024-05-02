new Vue({
    el: '#app',
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
            newCardTitle: '',
            newItemText: '',
            check: true,
        }
    },
    mounted(){
        if (localStorage.getItem('column1')) {
            try {
                this.column1 = JSON.parse(localStorage.getItem('column1'));
            } catch(e) {
                localStorage.removeItem('column1');
            }
        }
        if (localStorage.getItem('column2')) {
            try {
                this.column2 = JSON.parse(localStorage.getItem('column2'));
            } catch(e) {
                localStorage.removeItem('column2');
            }
        }
        if (localStorage.getItem('column3')) {
            try {
                this.column3 = JSON.parse(localStorage.getItem('column3'));
            } catch(e) {
                localStorage.removeItem('column3');
            }
        }
    },
    methods: {
        handleCardPosition(card) {
            const totalItems = card.items.filter(item => item.text.trim() !== '').length;
            const completedItems = card.items.filter(item => item.completed && item.text.trim() !== '').length;

            if (completedItems / totalItems >= 0.5 && this.column1.includes(card)) {
                if (this.column2.length < 5) {
                    card.items = card.items.filter(item => item.text.trim() !== '');
                    this.column1.splice(this.column1.indexOf(card), 1);
                    this.column2.push(card);
                    this.saveLocalStorage();
                }
            } else if (completedItems / totalItems === 1 && this.column2.includes(card)) {
                this.column2.splice(this.column2.indexOf(card), 1);
                this.check = true;
                this.column3.push(card);
                card.completedDate = new Date().toLocaleString();
                this.saveLocalStorage();

                if (this.column1.length > 0 && this.column2.length < 5) {
                    const cardToMove = this.column1[0];
                    this.column1.splice(0, 1);
                    this.column2.push(cardToMove);
                    this.saveLocalStorage();
                }
            }
        },
        completeAllTasks() {
            this.column1.forEach(card => {
                card.items.forEach(item => {
                    item.completed = true;
                });
                this.column3.push(card);
            });
            this.column1 = [];

            this.column2.forEach(card => {
                card.items.forEach(item => {
                    item.completed = true;
                });
                this.column3.push(card);
            });
            this.column2 = [];

            this.saveLocalStorage();
        },
        addCard() {
            if (this.newCardTitle !== '' && this.column1.length < 3 && this.column2.length < 5) {
                const newCard = {
                    id: Date.now(),
                    title: this.newCardTitle,
                    items: [
                        { text: '', completed: false, editing: true },
                        { text: '', completed: false, editing: true },
                        { text: '', completed: false, editing: true }
                    ],
                };
                if (this.newCardTitle !== '') {
                    this.column1.push(newCard);
                }

                this.handleCardPosition(newCard);
                this.newCardTitle = '';
                this.newItemText = '';
                this.saveLocalStorage();
            }
        },
        addItem(card) {
            if (this.newItemText.trim() !== '' && card.items.length <= 4) {
                card.items.push({ id: Date.now(), text: this.newItemText.trim(), completed: false, editing: true });
                this.newItemText = '';
            }
        },
        saveLocalStorage() {
            const parsed = JSON.stringify(this.column1);
            const parsed1 = JSON.stringify(this.column2);
            const parsed2 = JSON.stringify(this.column3);
            localStorage.setItem('column1', parsed);
            localStorage.setItem('column2', parsed1);
            localStorage.setItem('column3', parsed2);
        },
    },
    computed: {
        columeTaskCount() {
            return this.column2.length;
        },
        TaskCheck() {
            return this.check;
        }
    }
})