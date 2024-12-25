const express = require("express");
const router = express.Router();
const MenuItem = require("./../Model/Menu");

router.post("/savemenu", async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log("Menu Item :", response);
        res.status(200).send({
            name: newMenuItem.name,
            price: newMenuItem.price,
            drink: newMenuItem.isDrink,
            taste: newMenuItem.taste,
            isDrink: newMenuItem.isDrink,
            incredient: newMenuItem.incredient,
            num_sales: newMenuItem.num_sales,
        });
    } catch (err) {
        console.log("Intenal Server Error: ", err);
        res.status(500).send(err);
    }
});

router.get("/getallmenu", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("data", data);
        res.status(200).json(data);
    } catch (err) {
        console.log("Error in allmenuitems API", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/taste/:taste", async (req, res) => {
    try {
        const tasteType = req.params.taste;
        const response = await MenuItem.find({ taste: tasteType });
        console.log("type of response is", typeof response);
        console.log("Response: =>", response);
        res.status(200).json(response);
    } catch (err) {
        console.log("Error in allmenuitems API", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const menuid = req.params.id;
        console.log("length ;", menuid.length);
        const updateData = req.body;
        console.log("before response");

        const response = await MenuItem.findByIdAndUpdate(menuid, updateData, {
            new: true,
            runValidators: true,
        });
        console.log("after response", response);

        if (!response) {
            return res.status(200).json({ error: "Menu not found" });
        }
        res.status(200).json(response);
    } catch (err) {
        console.log("Error in /menu/update API:", err.message);
        res.status(500).json({ error: "Internal Serval Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const menuid = req.params.id;
        console.log("id", menuid);
        const response = await MenuItem.findByIdAndDelete(menuid);
        console.log("response", response);
        if (!response) {
            return res.status(404).json({ error: "Menu ID not found" });
        }
        res.status(200).json({ message: "Data delete successfully" });
    } catch (err) {
        console.log("Error in /menu/delete/:id API", err.message);
        res.status(500).json({ error: "Internal Serval Error" });
    }
});

module.exports = router;
