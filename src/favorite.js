export class githubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint).then(data => data.json()).then(({login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos, 
            followers
        })) 
    }
}

export class favorites { 
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
        githubUser.search('gabrielscoti42').then(user => console.log(user))
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        
        this.entries = filteredEntries
        this.update()
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
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Você quer mesmo excluir este usuário?')
                if(isOk) {
                    this.delete(user)
                }
            }

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
