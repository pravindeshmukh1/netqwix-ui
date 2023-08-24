import React, { useState, Children, cloneElement } from "react";
import { Card, CardBody, CardHeader, Collapse, Button } from "reactstrap";
import PropTypes from "prop-types";

const Accordion = ({ open, children }) => {
  const [currentOpen, setCurrentOpen] = useState(open);

  const toggleSection = (index) => () => {
    setCurrentOpen((prevOpen) => (index === prevOpen ? undefined : index));
  };

  return (
    <div className="accordion">
      {Children.map(children, (child, index) => {
        if (child.type !== AccordionItem) return null;
        return cloneElement(child, {
          isOpen: child.props.open || currentOpen === index,
          onClick: toggleSection(index),
        });
      })}
    </div>
  );
};

Accordion.propTypes = {
  open: PropTypes.number,
};

const AccordionItem = ({ children, isOpen, onClick }) => (
  <Card>
    {Children.map(children, (child) => {
      if (child.type === AccordionHeader) {
        return cloneElement(child, { onClick });
      }

      if (child.type === AccordionBody) {
        return cloneElement(child, { isOpen });
      }

      return null;
    })}
  </Card>
);

const AccordionHeader = ({ children, onClick }) => (
  <CardHeader>
    <h5 className="mb-0">
      <Button color="link" onClick={onClick}>
        {children}
      </Button>
    </h5>
  </CardHeader>
);

const AccordionBody = ({ children, isOpen }) => (
  <Collapse isOpen={isOpen}>
    <CardBody>{children}</CardBody>
  </Collapse>
);

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
