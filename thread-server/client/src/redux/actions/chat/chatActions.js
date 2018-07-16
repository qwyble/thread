

module.exports = {

  deleteMessage: function(id){
    return {
      type: 'DELETE_MESSAGE',
      id: id,
    }
  },


  addMessage: function(text, threadId){
    return {
      type: 'ADD_MESSAGE',
      text: text,
      threadId: threadId,
    }
  },

  openThread: function(id){
    return {
      type: 'OPEN_THREAD',
      id: id
    }
  }


}
