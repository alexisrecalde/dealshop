import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import moment from "moment";
import CompraByItem from "./compraByItem";
import { Skeleton } from "primereact/skeleton";

export default function MisComprasItem({ items }) {
  const [groupByDate, setGroupByDate] = useState([]);
  const [loading, setLoading] = useState(true);
  moment.locale("mx");
  const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.map((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  };

  useEffect(() => {
    const load = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    load();
  }, []);

  const transformDate = (datePurchase) => {
    const dateTransformer = moment(datePurchase).format("LL");
    return dateTransformer;
  };

  useEffect(() => {
    const grouping = () => {
      const grouped = groupBy(items, (el) => el.createdAt.slice(0, 10));
      setGroupByDate(Array.from(grouped));
    };
    grouping();
  }, []);

  const skeleton = () => {
    return (
      <>
        {" "}
        <div className="" style={{ border: "1px solid #dee2e6" }}>
          <div className="">
            <div className="custom-skeleton p-4">
              <Skeleton width="100%" height="150px"></Skeleton>
              <div className="flex mt-3">
                <div>
                  <Skeleton width="10rem" className="mb-2"></Skeleton>
                  <Skeleton width="5rem" className="mb-2"></Skeleton>
                  <Skeleton height=".5rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (loading) {
    return <>{skeleton()}</>;
  }

  if (!loading) {
    return (
      <>
        {groupByDate.length > 0
          ? groupByDate.reverse().map((el) => {
              return (
                <Card className="container-card-compras">
                  <span>{transformDate(el[0])}</span>
                  <Divider />
                  {el[1].map((item) => {
                    return <CompraByItem item={item} />;
                  })}
                </Card>
              );
            })
          : ""}
      </>
    );
  }
}
