class PageNavi extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
            <div id="pagination" class="d-flex justify-content-between py-3">
                <button id="btnPrev" class="btn btn-lg btn-outline-primary" type="button"><i
                        class="fa fa-chevron-left"></i></button>
                <button id="btnNext" class="btn btn-lg btn-outline-primary" type="button"><i
                        class="fa fa-chevron-right"></i></button>
            </div>
        `;
    }
}
customElements.define('page-navi', PageNavi);