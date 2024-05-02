import './App.css';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";

// Component for our booking page
function Booking( {readBookedItem, setBookingItem} ) {
    // Info with trip card
    // Form with required fields
    // Confirm button, "Order Successful" page? (view = 3?)

    const [item, setItem] = useState(readBookedItem);
    const [data, setData] = useState({});
    const [view, setView] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data); // log all data
        setData(data);
        setView(true);
        reset();
    };

    function getCost(item) {
        if (item.cost == null) {
            return (
                <div>
                    <div className="card-text text-decoration-line-through">{item.costold}</div>
                    <div className="card-text fw-bold">{item.costnew}</div>
                </div>
            )
        } else {
            return item.cost;
        }
    }

    function RenderOrder() {

        return (
            <div>
                <div className="row row-cols-4 g-3">
                    <div className="col"></div>
                    <div className="col">
                        <h3>Selected Guide:</h3>
                        <div className="card shadow-sm">
                            <img className="card-img-top" src={item.url} />
                            <div className="card-body">
                                <div className="card-text lead">{item.location}</div>
                                <div className="card-text">{getCost(item)}</div>
                                <div className="card-text" 
                                    style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p>{item.duration}</p>
                                    <button 
                                        type='button' 
                                        className="btn btn-danger rounded"
                                        onClick={() => {setBookingItem(null); reset(); setView(false)}}
                                        >Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <h3>Payment Information:</h3>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="container mt-5"
                            style={{ width: 500 }}
                        >
                            <input
                                {...register("fullName", { required: true })}
                                placeholder="Full Name"
                                className="form-control"
                                type="text"
                                style={{ marginBottom: '5px' }}
                            />
                            {errors.fullName && (
                                <p className="text-danger">Full Name is required.</p>
                            )}

                            <input
                                {...register("country", { required: true })}
                                placeholder="Country/Region"
                                className="form-control"
                                type="text"
                                style={{ marginBottom: '5px' }}
                            />
                            {errors.country && (
                                <p className='text-danger'>Country/Region is required.</p>
                            )}

                            <input
                                {...register("phoneNumber", { required: true, maxLength: 10, minLength: 10 })}
                                placeholder="Phone Number"
                                className="form-control"
                                type="number"
                                style={{ marginBottom: '5px' }}
                            />
                            {errors.phoneNumber && (
                                <p className='text-danger'>Phone Number is required.</p>
                            )}

                            <input
                                {...register("address", {required: true })}
                                placeholder='Street Address'
                                className="form-control"
                                type="text"
                                style={{ marginBottom: '5px' }}
                            />
                            {errors.address && (
                                <p className='text-danger'>Address is required.</p>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <input
                                    {...register("city", { required: true })}
                                    placeholder="City"
                                    className="form-control"
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.city && (
                                    <p className="text-danger">City is required.</p>
                                )}

                                <input
                                    {...register("state", { required: true})}
                                    placeholder="State"
                                    className="form-control"
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.state && (
                                    <p className="text-danger">State is required.</p>
                                )}

                                <input
                                    {...register("zip", { required: true, maxLength: 5, minLength: 5 })}
                                    placeholder="Zip Code"
                                    className="form-control"
                                    type="number"
                                    style={{ marginBottom: '5px' }}
                                />
                                {errors.zip && (
                                    <p className="text-danger">Zip Code is required. </p>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <input
                                {...register("cardNumber", { required: true, maxLength: 16, minLength: 16 })}
                                placeholder="16 Digit Card Number"
                                className="form-control"
                                type="number"
                                style={{ marginBottom: '5px' }}
                            />
                            {errors.cardNumber && (
                                <p className="text-danger">Card Number is required.</p>
                            )}

                            <input
                                {...register("csv", { required: true, maxLength: 3, minLength: 3 })}
                                placeholder="CSV"
                                className="form-control"
                                type="number"
                                style={{ marginBottom: '5px', width: '100px' }}
                            />
                            {errors.csv && (
                                <p className="text-danger">CSV is required.</p>
                            )}
                            </div>

                            <input
                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                placeholder="Email Address"
                                className="form-control"
                                type="text"
                                style={{ marginBottom: '5px' }}
                            />
                            {errors.email && (
                                <p className="text-danger">Email is required.</p>
                            )}

                            <button 
                                type="submit" 
                                className="btn btn-success"
                                >Confirm
                            </button>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    }

    function Confirmation() {
        return (
            <div>
                <h1 className="text-center">Thank you!</h1>
                <div className="row row-cols-2 g-3">
                    <div className="col">
                        <div className="card shadow-sm">
                            <img className="card-img-top" src={item.url} />
                            <div className="card-body">
                                <div className="card-text lead">{item.location}</div>
                                <div className="card-text">{getCost(item)}</div>
                                <div className="card-text" 
                                    style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p>{item.duration}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <h3>Confirmation Information:</h3>
                        <div style={{ marginLeft: '30px' }}>
                            <p>Name: {data.fullName}</p>
                            <p>Country/Region: {data.country}</p>
                            <p>Phone Number: {data.phoneNumber}</p>
                            <p>Address: {data.address}, {data.city}, {data.state} {data.zip}</p>
                            <p>Card Number: xxxx-xxxx-xxxx-{data.cardNumber[12]}{data.cardNumber[13]}{data.cardNumber[14]}{data.cardNumber[15]}</p>
                            <p>Email: {data.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Book a Trip!</h1>
                <button type='button' 
                    className={`btn ${view ? 'btn-success' : 'btn-danger'} text-white rounded`} 
                    style={{ marginRight: '10px' }}
                    onClick={() => {setBookingItem(null); reset(); setView(false); setData({})}}
                    >{view ? "Done" : "Back"}
                </button>
            </div>

            {!view && <RenderOrder />}
            {view && <Confirmation />}
        </div>
    )
}

export default Booking;