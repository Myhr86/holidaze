export default function FindUrl(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return (
      message.match(urlRegex
      )
    );
  }
