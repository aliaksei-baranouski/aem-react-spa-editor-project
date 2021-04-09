package com.adobe.aem.guides.wknd.spa.react.core.models;

import com.adobe.cq.export.json.ComponentExporter;

public interface FormWithModal extends ComponentExporter {
    public String getHeading();
    public String getSubheading();
}
