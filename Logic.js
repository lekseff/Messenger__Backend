class Logic {
  constructor() {
    this.db = [];
  }

  /**
   * Вход участника
   * @param {*} data - данные с фронта
   * @returns - инфо
   */
  loginHandler(data) {
    // Ищем пользователя с текущ именем
    const isName = this.db.find((item) => {
      return item.participant === data.participant;
    });
    const message = !isName ? `Добро пожаловать, ${data.participant}`: `Имя ${data.participant} занято`;
    // Если нет добавляем в БД
    if(!isName) {
      this.db.push({id: data.id, participant: data.participant});
      return {
        event: 'login',
        participant: data.participant,
        status: true,
        message,
        online: this.db,
      }  
    }    
    return {
      event: 'login',
      status: false,
      message,
    }    
  }

  /**
   * Удаление offline участника
   */
  offlineParticipant(id) {
    const idx = this.db.findIndex((item) => {
      return item.id === id;
    });
    if(idx === -1) return;
    const { participant } = this.db[idx]; // Имя покинувшего участника
    this.db.splice(idx, 1); // Удаляем покинувшего
    return { 
      event: 'offline',
      id,
      message: `"${participant}" покинул чат`
    }   
  }

  /**
   * Обработка сообщений чата
   * @param {*} data - данные
   * @returns объект данных
   */
  sendChatMessage(data) {
    return {
      ...data,
      date: new Date(Date.now()).toLocaleTimeString(),
    }
  }
}

module.exports = Logic;