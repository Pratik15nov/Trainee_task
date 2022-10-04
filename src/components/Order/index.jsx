import React from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { orderListDataHandler, orderUpdate } from "../../service/auth.service";
import { useEffect } from "react";
import { listBody } from "../../utils/helper";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Invoice from "../Checkout/Invoice";
// import { orderinvoiceDataHandler } from "../../service/auth.service";
import Ordercard from "./Ordercard";
import Ordercardskel from "./Ordercardskel";
export default function Order() {
  const [orderList, setOrderList] = useState();
  const [invoicedata, setInvoiceData] = useState([]);
  const [orderSubtotal, setOrderSubtotal] = useState(0);
  const [isInvoice, setIsInvoice] = useState(false);
  const [loading, setLoading] = useState();
  const [updateLoading, setUpdateLoading] = useState(null);
  const [cardData, setCardData] = useState(true);

  useEffect(() => {
    orderListHandler();
  }, []);

  const orderListHandler = async (pId) => {
    const response = await orderListDataHandler(
      listBody({
        where: {
          isActive: true,
          userId: JSON.parse(localStorage.getItem("userData"))?.id,
        },
      })
    );

    if (response) {
      const updatedList = [];
      response.filter((res) => {
        res.cartdetail.filter((res1) => {
          updatedList.push({
            ...res,
            productId: res1.productId,
            quantity: res1.quantity,
          });
        });
        setCardData(false);
      });

      setOrderList(updatedList.filter((data) => data.productId !== null));
    }
  };

  const componentRef = React.useRef();

  const invoiceDataHandler = async (pId, index) => {
    setLoading(index);
    const selectedData = orderList.filter((res) => res.paymentId === pId)[0];
    // console.log(orderList.filter((res) => res.paymentId === pId)[0]);

    // const response = await orderinvoiceDataHandler(
    //   listBody({ where: { isActive: true, paymentId: pId } })
    // );

    // if (response) {
    setInvoiceData(selectedData);
    setIsInvoice(true);
    var orderSubtotal = selectedData.cartdetail?.reduce(
      (acc, value) => value.productId?.price * value.quantity,
      0
    );
    // console.log(orderSubtotal);
    // for (var i = 0; i < selectedData.cartdetail.length; i++) {
    //   orderSubtotal +=
    //     selectedData.cartdetail[i].productId.price *
    //     selectedData.cartdetail[i].quantity;
    // }
    setOrderSubtotal(orderSubtotal);
    setTimeout(async () => {
      await handleDownloadPdf();
    }, 1000);
    // }
  };
  const updateState = async (id, index) => {
    setUpdateLoading(index);
    const body = {
      orderStatus: "CANCEL",
    };
    const response = await orderUpdate(id, body);
    if (response) {
      orderListHandler();
      setUpdateLoading(null);
    }
  };

  const handleDownloadPdf = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`shoppy_invoice_${invoicedata.paymentId}`);
    setIsInvoice(false);
    setLoading(null);
  };

  return (
    <div className="container-fluid text">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link className="breadcrumb-item active" to="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">Orders</li>
              </ol>
            </div>
            <h4 className="page-title text">Your Orders</h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        {!cardData ? (
          <div className="col-9">
            {orderList?.length > 0 ? (
              orderList?.map((card, index) => {
                console.log(card);
                return (
                  <Ordercard
                    card={card}
                    index={index}
                    loading={loading}
                    invoiceDataHandler={invoiceDataHandler}
                    updateState={() => updateState(card._id, index)}
                    updateLoading={updateLoading}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="col-9">
            <Ordercardskel />
            <Ordercardskel />
          </div>
        )}
      </div>
      <div ref={componentRef}>
        {isInvoice ? (
          <Invoice invoicedata={invoicedata} orderSubtotal={orderSubtotal} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
