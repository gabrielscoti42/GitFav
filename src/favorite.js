export class favorites { 
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = [{
            login: "gabrielscoti42", 
            name: "Gabriel Scoti",
            public_repos: "11",
            followers: "0",
        },
        {
            login: "gabrielscoti42", 
            name: "Gabriel Scoti",
            public_repos: "11",
            followers: "0",
        },
    ]
    }
}

export class favoritesView extends favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector("table tbody")

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.public_repos
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            this.tbody.append(row)
        })
    }

    createRow() {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td class="user">
              <img
                src="https://github.com/gabrielscoti42.png"
                alt="Imagem do usuário"
              />
              <a href="https://github.com/gabrielscoti42" target="_blank">
                <p>Gabriel Scoti</p>
                <span>gabrielscoti42</span>
              </a>
            </td>
            <td class="repositories">11</td>
            <td class="followers">0</td>
            <td>
              <button class="remove">Remove</button>
            </td>`
            return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }
}
