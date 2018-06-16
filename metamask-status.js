//uses browser.window

class MetamaskStatus extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    // check web3 and MetaMask specifically
    window.addEventListener('load', function() {
      if (typeof web3 !== 'undefined') {
        console.log('web3 is enabled')
        if (web3.currentProvider.isMetaMask === true) {
          if (web3.eth.coinbase === null) {
            console.log('MetaMask is locked')
          } else {
            console.log('MetaMask is unlocked')
        } else {
          console.log('MetaMask is not available')
        }
      } else {
        console.log('web3 is not found')
      }
    })
  }
}
customElements.define('metamask-status', MetamaskStatus)
