import {
    DeleteOutlined,
    EyeInvisibleOutlined,
    MehOutlined,
    BulbOutlined,
  } from "@ant-design/icons";

import ItemList from "../../../component/ItemList/ItemList"

const ListItem = () => {
    const items = [
        { icon: DeleteOutlined, text: "Remove Makeup" },
        { icon: EyeInvisibleOutlined, text: "Take off the glasses" },
        { icon: MehOutlined, text: "Make sure it doesn't block your face" },
        { icon: BulbOutlined, text: "Make sure the lighting is sufficient" },
    ]

    return (
        <>
         <p>For the best result:</p>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="pb-2">
                <ItemList icon={item.icon} text={item.text} secondary />
              </li>
            ))}
          </ul>
        </>
    );



};

export default ListItem;