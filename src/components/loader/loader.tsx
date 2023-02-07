import { Dimmer, Loader, Segment } from "semantic-ui-react";

import "semantic-ui-css/components/loader.min.css";

export const AppLoader = () => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader size="massive">
          <p className="text text_type_main-medium mt-8">Заказ оформляется...</p>
        </Loader>
      </Dimmer>
    </Segment>
  </div>
);
