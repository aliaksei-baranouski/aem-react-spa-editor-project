package com.adobe.aem.guides.wknd.spa.react.core.servlets;

import com.adobe.aem.guides.wknd.spa.react.core.services.SalesForceConfig;
import com.force.api.ApiConfig;
import com.force.api.ApiException;
import com.force.api.ForceApi;
import com.force.api.QueryResult;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component(
        immediate = true,
        service = Servlet.class,
        property = {
                "sling.servlet.paths=/bin/salesforce",
                "sling.servlet.methods=post"
        }
)
@Designate(ocd = SalesForceConfig.class)
public class SendDataServlet extends SlingAllMethodsServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger LOGGER = LoggerFactory.getLogger(SendDataServlet.class);

    private static final String DEFAULT_COMPANY_VALUE = "Company";
    private static final String FIRST_NAME_FORM_KEY = "firstname";
    private static final String LAST_NAME_FORM_KEY = "lastname";
    private static final String EMAIL_FORM_KEY = "email";
    private static final String PHONE_FORM_KEY = "phone";
    private static final String PRODUCT_INTEREST_FORM_KEY = "productinterest";
    private static final String ID_SALES_FORCE_KEY = "Id";
    private static final String LEAD_SALES_FORCE_KEY = "Lead";
    private static final String LEAD_TYPE_SALES_FORCE_KEY = "lead";
    private static final String FIRST_NAME_SALES_FORCE_KEY = "FirstName";
    private static final String LAST_NAME_SALES_FORCE_KEY = "lastname";
    private static final String COMPANY_SALES_FORCE_KEY = "Company";
    private static final String EMAIL_SALES_FORCE_KEY = "email";
    private static final String PHONE_SALES_FORCE_KEY = "Phone";
    private static final String PRODUCT_INTEREST_SALES_FORCE_KEY = "ProductInterest__c";

    private String userName;
    private String password;
    private String clientId;
    private String clientSecret;

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        StringBuilder strBuilder = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                strBuilder.append(line);
            }
            JSONObject jsonObj = new JSONObject(strBuilder.toString());

            ForceApi api = new ForceApi(new ApiConfig()
                    .setUsername(userName)
                    .setPassword(password)
                    .setClientId(clientId)
                    .setClientSecret(clientSecret));

            Map lead = new HashMap<>();
            lead.put(FIRST_NAME_SALES_FORCE_KEY, jsonObj.getString(FIRST_NAME_FORM_KEY));
            lead.put(LAST_NAME_SALES_FORCE_KEY, jsonObj.getString(LAST_NAME_FORM_KEY));
            lead.put(COMPANY_SALES_FORCE_KEY, DEFAULT_COMPANY_VALUE);
            lead.put(EMAIL_SALES_FORCE_KEY, jsonObj.getString(EMAIL_FORM_KEY));
            lead.put(PHONE_SALES_FORCE_KEY, jsonObj.getString(PHONE_FORM_KEY));
            lead.put(PRODUCT_INTEREST_SALES_FORCE_KEY, jsonObj.getString(PRODUCT_INTEREST_FORM_KEY));

            // Check if the Lead already exists with the specified email address
            String query = String.format("SELECT %s,%s,%s,%s,%s,%s,%s FROM %s WHERE %s LIKE '%s'", ID_SALES_FORCE_KEY,
                    FIRST_NAME_SALES_FORCE_KEY, LAST_NAME_SALES_FORCE_KEY, COMPANY_SALES_FORCE_KEY, EMAIL_SALES_FORCE_KEY,
                    PHONE_SALES_FORCE_KEY, PRODUCT_INTEREST_SALES_FORCE_KEY, LEAD_SALES_FORCE_KEY, EMAIL_SALES_FORCE_KEY,
                    lead.get(EMAIL_SALES_FORCE_KEY));
            QueryResult<Map> queryResult = api.query(query, Map.class);

            // If the Lead doesn't exist, then we create a new one, otherwise, we update the existing one
            if (queryResult.getTotalSize() == 0) {
                LOGGER.info("Creating a new Lead");
                String newLeadId = api.createSObject(LEAD_TYPE_SALES_FORCE_KEY, lead);
                LOGGER.info("The Lead is created. Its id: " + newLeadId);
            } else {
                Map soObject = queryResult.getRecords().get(0);
                String id = (String) soObject.get(ID_SALES_FORCE_KEY);
                LOGGER.info("Updating Lead: " + soObject);
                api.updateSObject(LEAD_TYPE_SALES_FORCE_KEY, id, lead);
                LOGGER.info("Lead updated");
            }
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (JSONException | ApiException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            LOGGER.error("Error occurred while parsing JSON data or calling ForceApi: ", e);
        }
    }

    @Activate
    @Modified
    protected void Activate(SalesForceConfig config) {
        userName = config.salesforce_username();
        password = config.salesforce_password();
        clientId = config.salesforce_client_id();
        clientSecret = config.salesforce_client_secret();
    }
}
