import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    return cells!;
  });

  const { data, order } = cells;
  const renderCells = order
    .map((id) => data[id])
    .map((cell) => (
      <>
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell nextCellId={cell.id} />
        </Fragment>
      </>
    ));

  return (
    <div>
      <div className={renderCells.length === 0 ? "force-visible" : ""}>
        <AddCell forceVisible={renderCells.length === 0} nextCellId={null} />
      </div>
      {renderCells}
    </div>
  );
};

export default CellList;
