const express = require("express");
const app = express();
app.use(express.json());
app.use(require("cors")());

const fullName = "paramveer_kansal";
const dob = "29012005";
const email = "abc@gmail.com";
const rollNumber = "2210990636";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let concatAlpha = "";

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        const num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatAlpha += item;
      } else {
        special_characters.push(item);
      }
    });

    let reversedConcat = concatAlpha.split("").reverse().join("");
    let concat_string = reversedConcat
      .split("")
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
