const Messages = require('./path/to/your/model');

const handleMessage = async (req, res) => {
  const { name, email, Subject, newMessage } = req.body;

  try {
    const existingUser = await Messages.findOne({ email });

    if (existingUser) {
      // Push new message at the 0th index
      existingUser.Message.unshift(newMessage);
      existingUser.date = new Date(); // Update timestamp if needed
      await existingUser.save();

      return res.status(200).json({ message: "Message added to existing user" });
    } else {
      // Create a new entry
      const newEntry = new Messages({
        name,
        email,
        Subject,
        Message: [newMessage],
        date: new Date()
      });

      await newEntry.save();
      return res.status(201).json({ message: "New message entry created" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};
