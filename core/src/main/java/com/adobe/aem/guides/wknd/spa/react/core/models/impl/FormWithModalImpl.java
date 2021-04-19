package com.adobe.aem.guides.wknd.spa.react.core.models.impl;

import com.adobe.aem.guides.wknd.spa.react.core.models.FormWithModal;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { FormWithModal.class,
        ComponentExporter.class }, resourceType = FormWithModalImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FormWithModalImpl implements FormWithModal {
    static final String RESOURCE_TYPE = "wknd-spa-react/components/form-with-modal";

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String subheading;

    @Override
    public String getHeading() {
        return heading;
    }

    @Override
    public String getSubheading() {
        return subheading;
    }

    @Override
    public String getExportedType() {
        return FormWithModalImpl.RESOURCE_TYPE;
    }
}
