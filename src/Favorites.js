import { GithubUser } from "./githubuser.js"


export class Favorites { 
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    checkEmpty() {
    const wrapper = document.querySelector(".modalWrapper")
    const users = this.entries.length

        if(users == 0) {
        wrapper.classList.add("open")
        }
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
        this.checkEmpty()
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username) {
        try {
            const userExists = this.entries.find(entry => entry.login === username)
            if(userExists) {
                throw new Error('User already exists')
            }

            const user = await GithubUser.search(username)
            if(user.login === undefined) {
                throw new Error(`User doesn't exist`)
            }
            this.entries = [user, ...this.entries]
            document.querySelector(".modalWrapper").classList.remove("open")
            this.update()
            this.save()
        } catch(error) {
            alert(error.message)
        }
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        
        this.entries = filteredEntries
        this.update()
        this.save()
        this.checkEmpty()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        
        this.tbody = this.root.querySelector("table tbody")
        
        this.update()
        this.onAdd()
    }

    onAdd() {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')
            this.add(value)
        }
    }

    update() {
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
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
