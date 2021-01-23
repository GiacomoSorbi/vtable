import { Wrapper, ItemWrapper, Item } from "./styles";

const Tabs = ({ tabs, activeIndex, onChange }) => {
  return (
    <Wrapper className="nav nav-tabs">
      {tabs.map((tab, idx) => (
        <ItemWrapper className="nav-item">
          <Item
            className={`nav-link ${idx === activeIndex ? "active" : ""}`}
            href="#"
            onClick={() => onChange(idx)}
          >
            {tab}
          </Item>
        </ItemWrapper>
      ))}
    </Wrapper>
  );
};

export default Tabs;
