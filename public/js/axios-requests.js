class apiHandler {
  constructor(url) {
    this.api = axios.create({ baseURL: url })
  }

  getAll() {
    return this.api.get()
  }

  getList(from) {
    return this.api.get(from)
  }

  getOne(id) {
    return this.api.get(id)
  }

  createOne(data, helper) {
    return this.api.post(helper ? `/${helper}` : '', data)
  }

  editOne(id, data) {
    return this.api.patch(id, data)
  }

  deleteOne(id) {
    return this.api.delete(id)
  }
}
