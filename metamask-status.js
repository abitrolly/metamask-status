//uses browser.window

class MetamaskStatus extends HTMLElement {
  constructor() {
    super();

    // attachShadow fills this.shadowRoot automatically
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
	#status { margin-left: 5px; text-transform: uppercase; font-family: monospace }
      </style>
      <img src="metamask.svg" width="25">
      <span id="status">no web3</span>
    `;
  }

  connectedCallback() {
    // save reference to itself for event handlers
    const _this = this;
    const elstatus = this.shadowRoot.querySelector('#status')

    // check web3 and MetaMask specifically
    window.addEventListener('load', function() {
      if (typeof web3 !== 'undefined') {
        console.log('web3 is enabled')
        if (web3.currentProvider.isMetaMask === true) {
          _this.setAttribute('enabled', '')
          if (web3.eth.coinbase === null) {
            console.log('MetaMask is locked')
            _this.removeAttribute('unlocked', '')
	    elstatus.innerHTML = 'locked'
          } else {
            console.log('MetaMask is unlocked')
            _this.setAttribute('unlocked', '')
	    elstatus.innerHTML = 'unlocked'
          }
        } else {
          console.log('MetaMask is not available')
          _this.removeAttribute('enabled', '')
	  elstatus.innerHTML = 'web3 w/o metamask'
        }
      } else {
        console.log('web3 is not found')
	elstatus.innerHTML = 'no web3'
      }
    })
  }
}
customElements.define('metamask-status', MetamaskStatus)
