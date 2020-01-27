<template>
  <div class="home">
    <NavBar />

      <div class="main">
        <h1> VUE Simple Voting </h1>
        <ul class="cards">
          <li class="cards_item" v-for="(candidate,index) in candidates" :key="index">
            <div class="card">
              <div class="card_image"><img :src="`https://picsum.photos/500/300/?image=${Math.floor(Math.random() * 100)}`"></div>
              <div class="card_content" >
                <h2 class="card_title"> Vote For: {{ candidate.name }} </h2>
                <p class="card_text"> Total Vote: {{ candidate.vote }} </p>
                <button class="btn card_btn" @click="voteAt(candidate.name, web3.networkId, web3.coinbase)"> Vote Now ! </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import SmartContract from '@/util'
import { mapState, mapActions } from 'vuex'
import UserDataPersistance from '@/userData/persistance'

const smartContract = new SmartContract()

export default {
  name: 'home',
  data: () => ({
    balance: '',
    account: '',
    network: [],
    block: [],
    userData: null,
    candidates: [],
  }),
  components: {
    NavBar
  },
  async created() {
    // console.log('Registering Web3 ..')
    // this.$store.dispatch('registerWeb3')

    this.userData = new UserDataPersistance()

    console.log("Initial Web3 Services ", smartContract)

    this.network = await smartContract.getNetID()
    this.block = await smartContract.getBlock()
    console.log('Block >> ' + JSON.stringify(this.block))

    try {
      this.account = await smartContract.loadUserAddress()
    } catch {
      this.account = ''
    }

    try {
      this.balance = await smartContract.getBalance(this.account)
    } catch {
      this.balance = '0'
    }

    try {
      this.candidateCount = await smartContract.getCandidateCount()
      console.log('Candidate Count: ', this.candidateCount);
      let name, vote

      for (let i=0;i<this.candidateCount;i++) {
        name = await smartContract.getCandidateName(i)
        vote = await smartContract.getCandidateTotalVote(name)
        console.log(`Candidate Name: ${name} Votes: ${vote}`);
        this.candidates.push({"name": name, "vote": vote, "img": "https://loremflickr.com/320/240"})
      }
    } catch {
      this.balance = '0'
    }

    this.updateWeb3({
      'coinbase': this.account,
      'balance': this.balance,
      'networkId': this.network.name
    })

    let _this = this
    window.ethereum.on('accountsChanged', async function (accounts) {
      console.log("change", accounts[0])
      this.network = await smartContract.getNetID()
      try {
        this.balance = await smartContract.getBalance(accounts[0])
      } catch {
        this.balance = '0'
      }

      _this.updateWeb3({
        'coinbase': accounts[0],
        'balance': this.balance,
        'networkId': this.network.name
      })
    })
  },
  computed: {
    ...mapState({
      web3: state => state.web3
    })
  },
  watch: {
  },
  methods: {
    ...mapActions({
      updateWeb3: 'updateWeb3'
    }),
    voteAt (name, network, userAccount) {
      smartContract.voteAt(name, network, userAccount).then(result => {
        console.log('Vote Result: ', result);
        this.$forceUpdate();
      })

    }
  }
}
</script>

<style lang="scss">
/* Font */
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,700');

/* Design */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background-color: #ecf9ff;
}

body {
  color: #272727;
  font-family: 'Quicksand', serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  padding: 1rem;
}

.main{
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem;
}

h1 {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
}

img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}

.btn {
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 400;
  display: block;
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
}

.btn:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cards_item {
  display: flex;
  padding: 1rem;
}

@media (min-width: 40rem) {
  .cards_item {
    width: 50%;
  }
}

@media (min-width: 56rem) {
  .cards_item {
    width: 33.3333%;
  }
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card_content {
  padding: 1rem;
  background: linear-gradient(to bottom left, #EF8D9C 40%, #FFC39E 100%);
}

.card_title {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 0px;
}

.card_text {
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  font-weight: 400;
}
.made_by{
  font-weight: 400;
  font-size: 13px;
  margin-top: 35px;
  text-align: center;
}

</style>
