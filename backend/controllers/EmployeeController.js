const { mongoose } = require("mongoose");
const employeeRegistrationModel = require("../models/EmployeeModel.js");

function GenerateEmployeeID() {
    var employee_id = "E";
    let i = 0;
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    while (i < 5) {
        employee_id += chars.charAt(Math.floor(Math.random() * chars.length));
        i++;
    }
    return employee_id;
}

const registerEmployee = async (req, res) => {
    try {
        const formData = req.body
        const employeeEmail = await employeeRegistrationModel.findOne({ email: formData.email })
        const employeeMobile = await employeeRegistrationModel.findOne({ mobile_no: formData.mobile_no })

        if (employeeEmail) {
            return res.status(200).json("Account Already Exist with this Email")
        } else if (employeeMobile) {
            return res.status(200).json("Account Already Exist with this Mobile number")
        }

        const employee_info = await employeeRegistrationModel.create({
            admin: req.admin._id,
            employee_id: GenerateEmployeeID(),
            name: formData.name,
            gender: formData.gender,
            age: formData.age,
            designation: formData.designation,
            department: formData.department,
            mobile_no: formData.mobile_no,
            email: formData.email,
            address: formData.address,
        })

        return res.status(200).json(employee_info)

    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: e.message })
    }
}

// GET ALL EMPLOYEES
const getEmployeesDetails = async (req, res) => {
    try {
        if (!req.admin?._id) {
            return res.status(401).json({ message: "Admin not found" })
        }

        const employee_details = await employeeRegistrationModel.find({ admin: req.admin._id })
        res.status(200).json(employee_details);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


// GET SINGLE EMPLOYEE
const getSingleEmployeeData = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Employee not found" });
        }

        const employee_data = await employeeRegistrationModel.findById(id)

        if (!employee_data) {
            return res.status(404).json({ message: "Employee not found" })
        }

        if (employee_data.admin.toString() != req.admin._id.toString()) {
            return res.status(401).json({ message: "Admin not Authorized" })
        }

        res.status(200).json(employee_data)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// UPDATE SINGLE EMPLOYEE
const updateSingleEmployeeData = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Employee not found" });
    }

    try {
        const employee = await employeeRegistrationModel.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (employee.admin.toString() != req.admin._id.toString()) {
            return res.status(401).json({ message: "Admin not Authorized" });
        }

        if (employee.email !== req.body.email) {
            const employeeEmail = await employeeRegistrationModel.findOne({ email: req.body.email });
            if (employeeEmail) return res.status(200).json("Email Already Exist");
        }

        if (employee.mobile_no !== req.body.mobile_no) {
            const employeeMobile = await employeeRegistrationModel.findOne({ mobile_no: req.body.mobile_no });
            if (employeeMobile) return res.status(200).json("Mobile Number Already Exist");
        }
        const employee_data = await employeeRegistrationModel.findByIdAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        res.status(200).json(employee_data);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// DELETE SINGLE EMPLOYEE
const deleteSingleEmployeeData = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Employee Data not found" });
    }

    try {
        const employee_data = await employeeRegistrationModel.findById(id);

        if (!employee_data) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (employee_data.admin.toString() != req.admin._id.toString()) {
            return res.status(401).json({ message: "Admin not Authorized" });
        }

        await employeeRegistrationModel.findByIdAndDelete(id);

        res.status(200).json("Employee Data Deleted Successfully");
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports = {
    registerEmployee,
    getEmployeesDetails,
    getSingleEmployeeData,
    updateSingleEmployeeData,
    deleteSingleEmployeeData,
};
