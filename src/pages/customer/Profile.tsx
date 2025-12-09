import { BASE_URL } from "@/config/apiConfig";
import { useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { receiveMessageOnPort } from "worker_threads";


type Profile = {
    firstName: string;
    lastName: string;
    email: string;
    receiveAddress: string;
};

const inputStyle = (enabled: boolean) => ({
    backgroundColor: enabled ? "white" : "#f5f5f5",
    color: "#333",
    border: "1px solid #ccc",
    padding: "8px",
    width: "250px",
});

function Profile() {
    const phoneNum = useAppSelector((state: RootState) => state.customerAuth.phoneNum);

    const [serverError, setServerError] = useState("");
    const [profileData, setProfileData] = useState<Profile | null>(null);

    // Track which fields are editable
    const [editableFields, setEditableFields] = useState({
        firstName: false,
        lastName: false,
        email: false,
        receiveAddress: false,
    });



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty }, // 👈 isDirty tracks changes
    } = useForm<Profile>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            receiveAddress: "",
        },
    });

    useEffect(() => {
        const fetchCustomerData = async () => {
            const infoUrl = `${BASE_URL}/api/customer/getInfo`;

            try {
                const response = await fetch(infoUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone: `+91${phoneNum}` }),
                    credentials: "include",
                });

                const data = await response.json();
                const { customerData } = data;
                if (response.ok) {
                    setProfileData(customerData);
                    reset(customerData); 
                } else {
                    setServerError(data.message || "Failed to fetch profile");
                }
            } catch (error: any) {
                setServerError(error.message || "Network error");
            }
        };

        fetchCustomerData();
    }, [phoneNum, reset]);

    const onSubmit = async (data: Profile) => {
        const updateUrl = `${BASE_URL}/api/customer/update-profile`;

        const updatePayload = {
            phone: `+91${phoneNum}`,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            receiveAddress: data.receiveAddress,
        };

        try {
            const response = await fetch(updateUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatePayload),
                credentials: "include",
            });

            const resData = await response.json();

            if (response.ok) {
                console.log("Update Successfully");
            } else {
                setServerError(resData.message || "Update failed");
            }
        } catch (error: any) {
            setServerError(error.message || "Network error");
        }
    };

    // Helper to enable editing for a field
    const enableEdit = (field: keyof Profile) => {
        setEditableFields((prev) => ({ ...prev, [field]: true }));
    };

    return (
        <div>
            <h2 className="mt-44">Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    First Name:
                    <input
                        {...register("firstName")}
                        defaultValue={profileData?.firstName}
                        disabled={!editableFields.firstName}
                        style={inputStyle(editableFields.firstName)}
                    />
                    <button type="button" onClick={() => enableEdit("firstName")}>Edit</button>
                </label>
                <br /><br />

                <label>
                    Last Name:
                    <input
                        {...register("lastName")}
                        defaultValue={profileData?.lastName}
                        disabled={!editableFields.lastName}
                        style={inputStyle(editableFields.lastName)} // ✅ corrected
                    />
                    <button type="button" onClick={() => enableEdit("lastName")}>Edit</button>
                </label>
                <br /><br />

                <label>
                    Email:
                    <input
                        {...register("email")}
                        defaultValue={profileData?.email}
                        disabled={!editableFields.email}
                        style={inputStyle(editableFields.email)} // ✅ corrected
                    />
                    <button type="button" onClick={() => enableEdit("email")}>Edit</button>
                </label>
                <br /><br />

                <label>
                    Address:
                    <input
                        {...register("receiveAddress")}
                        defaultValue={profileData?.receiveAddress}
                        disabled={!editableFields.receiveAddress}
                        style={inputStyle(editableFields.receiveAddress)} // ✅ corrected
                    />
                    <button type="button" onClick={() => enableEdit("receiveAddress")}>Edit</button>
                </label>

                <br /><br />

                <button type="submit" disabled={isSubmitting || !isDirty}>
                    {isSubmitting ? "Updating..." : "Update"}
                </button>

                {serverError && <p style={{ color: "red" }}>{serverError}</p>}
            </form>
        </div>
    );
}

export default Profile;
