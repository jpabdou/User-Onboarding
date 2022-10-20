import React, {useState,useEffect} from "react";
import axios from "axios";
import * as yup from "yup";

export default function Form(){
    const starterForm = {fname:"", lname:"",email: "", password:"", terms:false}
    const starterErrors = {fname:"", lname:"",email: "", password:"", terms:""}
    const [form, setForm] = useState({...starterForm})
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState({...starterErrors})
    const [users,setUsers] = useState([])

    const formSchema = yup.object().shape({
        fname: yup.string().required("First name required"),
        lname: yup.string().required("Last name required"),
        email: yup.string().email().required("Email required"),
        password: yup.string().required("Password required").min(6, "Password too short"),
        terms: yup.boolean().oneOf([true], "You must agree to the terms & conditions")
    })

    useEffect(()=>{
        formSchema.isValid(form).then(valid=>setDisabled(!valid))
      },[form])  

    function setFormErrors(name, value){
        yup.reach(formSchema, name).validate(value)
        .then(()=>setErrors({...errors,[name]: ""}))
        .catch(err=> setErrors({...errors, [name]:err.errors[0]}))
      }
  

    function submit(evt) {
        evt.preventDefault();
        axios.post("https://reqres.in/api/users", form)
            .then(res => {
                setUsers([...users,res.data])
                setForm({...starterForm})
                setErrors({...starterErrors})
            })
            .catch((err)=>{
                console.log(err)})
      }
  
    function onChange(evt) {
        const {checked,value,name,type} = evt.target
        if (type==="checkbox") {
            setForm({...form,[name]:checked})
            setFormErrors(name,checked)
        } else {
            setForm({...form, [name]:value})
            setFormErrors(name,value)
        }
    }


    return(
        <div className="form">
            <form onSubmit={submit}>
                <label>
                    First Name:<br></br>
                    <input onChange={onChange} name="fname" type="text" value={form.fname}></input>
                </label><br></br>
                <label>
                    Last Name:<br></br>
                    <input onChange={onChange} name="lname" type="text" value={form.lname}></input>
                </label><br></br>
                <label>
                    Email:<br></br>
                    <input onChange={onChange} name="email" type="email" value={form.email} />
                </label><br></br>
                <label>
                    Password:<br></br>
                    <input onChange={onChange} name="password" type="password" value={form.password} />
                </label><br></br>
                <label>
                    Accept the Terms & Conditons?<br></br>
                    <input onChange={onChange} name="terms" type="checkbox" checked={form.terms} />
                </label><br></br>
                <h6 id="error-log">{errors.fname} {errors.lname} {errors.email} {errors.password} {errors.terms}</h6>
                <button id="submitBtn" disabled={disabled}>Submit Info</button>
            </form>
            <pre id="entries-log">{JSON.stringify(users)}</pre>
        </div>
    )
}
