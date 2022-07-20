const { createApp } = Vue;
const setRandomLifeBar = (min, max) => Math.floor((Math.random() * (min + max)) + min);
const app = createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []       
        }
    },

    watch: {

        monsterHealth(newMonsterHealth) {
            if(newMonsterHealth <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            }else if(newMonsterHealth > 0 && this.playerHealth <= 0) {
                this.winner = 'monster';
            }
        },

        playerHealth(newPlayerHealth) {
            if(newPlayerHealth <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }else if(newPlayerHealth > 0 && this.monsterHealth <= 0) {
                this.winner = 'player';
            }
        }
    },

    computed: {
        healthBarMonster() {
            return (this.monsterHealth > 0) ? {width: `${this.monsterHealth}%`} : {width: `${this.monsterHealth = 0}%`}
        },

        healthBarPlayer() {
            return (this.playerHealth > 0) ? {width: `${this.playerHealth}%`} : {width: `${this.playerHealth = 0}%`}
        },

        mayUseSpecialAttack() {
            return (this.currentRound % 3 !== 0);
        },

        fullPlayerHealthBar() {
            return (this.playerHealth >= 100);
        }

    },

    methods: {
        startNewGame() {
            this.currentRound = 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.logMessages = [];
        },

        attackMonster() {
            const valueAttack = setRandomLifeBar(8,15);
            this.playerHealth-= valueAttack;
            this.attackPlayer();
            this.currentRound++;
            this.addLogMessage('monster', 'attack', valueAttack);
        },

        attackPlayer() {
            const valueAttack = setRandomLifeBar(6,12);
            this.monsterHealth-= valueAttack;
            this.addLogMessage('player', 'attack', valueAttack);
        },

        specialAttack() {
            const valueAttack = setRandomLifeBar(10,25);
            this.monsterHealth-= valueAttack;
            this.currentRound++;
            this.addLogMessage('player', 'attack', valueAttack);
        },

        upLifeBarPlayer() {
            this.currentRound++;
            let lifeBar = this.playerHealth+= setRandomLifeBar(8,20);
            let isFullLifeBar = (lifeBar >= 100);

            if(!isFullLifeBar) {
                this.playerHealth = lifeBar;
            }else {
                this.playerHealth = 100
            }    
            this.addLogMessage('player', 'heal', setRandomLifeBar(8,20));         
        },

        surrender() {
            this.winner = 'monster'
        },

        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
});

app.mount("#game");