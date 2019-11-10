const {
    tokens: { secretKey }
} = require('../app.config');
const Supplier = require('../models/supplier');

exports.getSupplier = async (req, res) => {
    let { id } = req.params;
    try {
        let supplier = await Supplier.findOne({ '_id': id });
        res.status(200).json({
            supplier
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrio un problema en el servidor',
            error
        });
    }

};

exports.listAll = async (req, res) => {

    try {
        let suppliers = await Supplier.find();
        res.status(200).json({
            suppliers
        });
    } catch (error) {
        res.status(401).json({
            message: 'No tienes autorización para seguir',
            error
        });
    }
};

exports.addSupplier = async (req, res) => {    
    const newSupplier = new Supplier(req.body)

    try {
        await newSupplier.save();
        res.status(201).json({
            message: 'Product saved successfuly.',
            supplier: newSupplier
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to save Supplier.',
            error
        });
    }
};

exports.updateSupplier = async (req, res) => {
    const id = req.params.supplierID;
    try {
        await Supplier.update({ _id: id }, {
            $set: {
                name,
                adress,
                contact
            }

        })
        res.status(201).json({
            message: 'Product saved successfuly.',
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update Supplier.',
            error
        });
    }
};


