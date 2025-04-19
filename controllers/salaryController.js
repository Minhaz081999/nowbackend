import Salary from '../models/Salary.js'
import Employee from '../models/Employee.js'

const addSalary = async (req, res)=>{
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body;
        const netSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary,
            payDate
        })

        await newSalary.save()

        return res.status(200).json({success: true})
    } catch(error) {
        return res.status(500).json({success: false, error: "Salary add server error"})
    }
}
 
const getSalary = async (req, res) => {
    try{
        const {id, role} = req.params

        let salary;
        if(role === 'admin'){
            salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
        }
        else{
            const employee = await Employee.findOne({userId: id})
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
        }
 
        return res.status(200).json({success: true, salary})
    } catch(error) {
        return res.status(500).json({success: false, error: "get salary server error"})
    }
}

const getSalaries = async (req, res) => {
    try{
        const salaries = await Salary.find().populate({
            path: 'employeeId',
            select: 'employeeId',
            populate: [
                {
                    path: 'department',
                    select: 'dep_name',
                },
                {
                    path: 'userId',
                    select: 'name',
                },
            ],
        })

        if(!salaries){
            return res.status(404).json({success: true, message: 'No Salaries Found'})
        }

        return res.status(200).json({success: true, salaries, message: 'Salaries fetched successfully'})
    } catch(error){
        return res.status(500).json({success: false, error: 'get Salaries server error'})
    }
}

export {addSalary, getSalary, getSalaries}