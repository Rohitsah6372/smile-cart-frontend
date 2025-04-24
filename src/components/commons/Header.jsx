import { Left } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ title, shouldShowBackButton = true }) => {
  const history = useHistory();

  return (
    <div className="m-2 flex items-center gap-3">
      {shouldShowBackButton && (
        <Button
          icon={Left}
          style="secondary"
          onClick={() => history.goBack()}
        />
      )}
      <Typography className="ml-4 text-5xl font-medium" style="h3">
        {title}
      </Typography>
    </div>
  );
};

export default Header;
