const Messages = require('../Database/Messages');

exports.addMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Ensure message is stored as an array of strings as per schema
    const messageContent = Array.isArray(message) ? message : [message];

    const newMessage = new Messages({
      name,
      email,
      Subject: subject,
      Message: messageContent,
      date: new Date()
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message", error });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Messages.find().sort({ date: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Messages.findByIdAndDelete(id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Error deleting message", error });
  }
};
