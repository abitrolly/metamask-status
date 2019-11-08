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
    this.content = this.shadowRoot.querySelector('#status')
  }

  // MetaMask is accessible and unlocked
  set unlocked(check) {
    if (check === true) {
      this.setAttribute('unlocked', '')
      this.content.innerHTML = 'unlocked'
    } else {
      this.removeAttribute('unlocked', '')
      this.content.innerHTML = 'locked'
    }
  }

  get unlocked() {
    return this.hasAttribute('unlocked')
  }

  connectedCallback() {
    // check Ethereum API and MetaMask specifically
    window.addEventListener('load', () => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('web3 is enabled')
        if (window.ethereum.isMetaMask === true) {
	  window.ethereum._metamask.isUnlocked()
	      .then(unlocked => {
                this.unlocked = unlocked
	      })
        } else {
          console.log('MetaMask is not available')
          this.removeAttribute('enabled', '')
	  this.content.innerHTML = 'web3 w/o metamask'
        }
      } else {
        console.log('web3 is not found')
	this.content.innerHTML = 'no web3'
      }
    })
  }
}
customElements.define('metamask-status', MetamaskStatus)
