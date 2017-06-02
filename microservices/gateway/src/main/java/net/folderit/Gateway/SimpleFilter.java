package net.folderit.Gateway;


import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_DECORATION_FILTER_ORDER;
import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.ROUTE_TYPE;

public class SimpleFilter extends ZuulFilter {


    private static final Log log = LogFactory.getLog(SimpleFilter.class);

    /**
     * @deprecated use {@link FilterConstants#PRE_DECORATION_FILTER_ORDER}
     */
    @Deprecated
    public static final int FILTER_ORDER = PRE_DECORATION_FILTER_ORDER;

    public SimpleFilter() {

    }

    @Override
    public String filterType() {
        return ROUTE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    /**
     * Indicates if the provided request is authorized or not.
     *
     * @param request the provided request
     *
     * @return true if the provided request is authorized, false otherwise
     */
    private boolean isAuthorizedRequest(HttpServletRequest request) {
        // apply your filter here
        return true;
    }

    @Override
    public Object run() {
        // logging the interception of the query
        log.debug("query interception");
        // retrieving the Zuul request context
        RequestContext ctx = RequestContext.getCurrentContext();
        return null;
    }





}
