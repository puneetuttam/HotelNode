const express = require("express");
const router = express.Router();
const Person = require("./../Model/Person.js");
router.post("/savePerson", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("newPerson", response);
        res.status(200).send({
            name: newPerson.name,
            email: newPerson.email,
            phone: newPerson.phone,
            work: newPerson.work,
        });
    } catch (err) {
        res.status(500).send({ "Error ": err.message });
        console.log("Internal Server Error");
    }
});

router.get("/getall", async (req, res) => {
    try {
        const response = await Person.find();
        res.status(200).json(response);
    } catch (err) {
        console.log("Error in /person/getall API", err.message);
        res.status(500).json({ error: "Internal Serval Error" });
    }
});

router.get("/worktype/:worktype", async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (
            worktype == "chef" ||
            worktype == "manager" ||
            worktype == "waiter"
        ) {
            const response = await Person.findOne({ work: worktype });
            console.log("Response or WorkType :", response);
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid WorkType" });
        }
    } catch (err) {
        console.log("Error in /person/:worktype API", err.message);
        res.status(500).json({ error: "Internal Serval Error" });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const personid = req.params.id;
        console.log("length ;", personid.length);

        if (personid.length != 26)
            return res.status(404).json({ error: "Invalid id format" });
        const updateData = req.body;
        console.log("before response");

        const response = await Person.findByIdAndUpdate(personid, updateData, {
            new: true,
            runValidators: true,
        });
        console.log("after response", response);

        if (!response) {
            return res.status(200).json({ error: "Person not found" });
        }
        res.status(200).json(response);
    } catch (err) {
        console.log("Error in /person/update API:", err.message);
        res.status(500).json({ error: "Internal Serval Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        console.log("id", personId);
        const response = await Person.findByIdAndDelete(personId);
        console.log("response",response)
        if (!response) {
            return res.status(404).json({ error: "Person ID not found" });
        }
        res.status(200).json({message: "Data delete successfully"});
    } catch (err) {
        console.log("Error in /person/delete/:id API", err.message);
        res.status(500).json({ error: "Internal Serval Error" });
    }
});

module.exports = router;
