import { useEffect, useState } from "react"
import Cards from "../components/Cards"
import { createMember, getFamilyTree } from "../api/familyApi";
import FamilyTreeGraph from "../components/FamilyTreeGraph.jsx";
import "./FamilyTree.css";

const FamilyTree = () => {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        relation: "",
        age: "",
        occupation: "",
        annualIncome: "",
        relatedToId: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    };

    const addEntity = async () => {
        try {
            await createMember({
                ...form,
                age: Number(form.age),
                annualIncome: Number(form.annualIncome),
                relatedToId: Number(form.relatedToId)
            });
            alert("Member created");
            setOpen(false);
        }
        catch (error) {
            console.log(error);
            alert("Error creating member");
        }
    };

    return (
        <>
            <Cards />
            <button type="button" className="family-tree-add-btn" onClick={() => setOpen(true)}>
                Add new Entity
            </button>
            <FamilyTreeGraph />
            {open && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Add Family Member</h3>

                        <input name="fullName" placeholder="Full Name" onChange={handleChange} />
                        <input name="relation" placeholder="Relation" onChange={handleChange} />
                        <input name="age" placeholder="Age" onChange={handleChange} />
                        <input name="occupation" placeholder="Occupation" onChange={handleChange} />
                        <input name="annualIncome" placeholder="Annual Income" onChange={handleChange} />
                        <input name="relatedToId" placeholder="Related To ID" onChange={handleChange} />

                        <div className="modal-actions">
                            <button className="btn-create" onClick={addEntity}>Create</button>
                            <button className="btn-cancel" onClick={() => setOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FamilyTree;

