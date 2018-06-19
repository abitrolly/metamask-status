//uses browser.window

class MetamaskStatus extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style></style>
      <img src="metamask.svg" width="25">
    `;
  }

  connectedCallback() {
    // save reference to itself for event handlers
    var _this = this;

    // check web3 and MetaMask specifically
    window.addEventListener('load', function() {
      if (typeof web3 !== 'undefined') {
        console.log('web3 is enabled')
        if (web3.currentProvider.isMetaMask === true) {
          _this.setAttribute('enabled', '')
          if (web3.eth.coinbase === null) {
            console.log('MetaMask is locked')
            _this.removeAttribute('unlocked', '')
          } else {
            console.log('MetaMask is unlocked')
            _this.setAttribute('unlocked', '')
          }
        } else {
          console.log('MetaMask is not available')
          _this.removeAttribute('enabled', '')
        }
      } else {
        console.log('web3 is not found')
      }
    })
  }
}
customElements.define('metamask-status', MetamaskStatus)
