// GA support functions
var trackEvent = function (url, category, action, label) {
	console.log(`Recording GA event\nCategory: ${category}\nAction: ${action}\nLabel: ${label}\nURL: ${url}`);
	if (typeof gtag !== 'undefined') {
		setTimeout(function () { console.log("Redirect timer fired for " + url); window.location = url; }, 1500);

		gtag("event", action.replace(" ", "_").toLowerCase(), {
			"event_category": category,
			"event_label": label,
			"event_callback": function () { window.location = url; }
		});
	} else { window.location = url; }
};
var trackEventNoCallback = function (category, action, label) {
	console.log(`Recording GA event\nCategory: ${category}\nAction: ${action}\nLabel: ${label}`);
	if (typeof gtag !== 'undefined') {
		gtag("event", action.replace(" ", "_").toLowerCase(), {
			"event_category": category,
			"event_label": label
		});
	}
};

// Deprecated method - log that it was called, pass data along to the new method
var trackEventNR = function (url, category, action, label) {
	console.warn("trackEventNR() is deprecated - please transition to calling trackEvent() instead");
	trackEventNoCallback("deprecated_JS", "trackEventNR", `${window.location}&${category}&${action}&${label}`);
	trackEvent(url, category, action, label);
}

// Global tracking declarations
$j(document).ready(function () {
    // Track clicks inside of the global alert bar
    $j(".globalAlert a").click(function () {
        trackEventNoCallback("Global Alert", "Click", $j(this).closest(".globalAlert[data-alertName]").attr("data-alertName"));
    });

/*** Homepage Hero Tracking Begin ***/
	// Homepage hero click tracking
	$j("#featuredContent[data-heroname] a").click(function () {
        trackEventNoCallback("City Homepage - Hero", "Click", $j(this).closest("#featuredContent[data-heroname]").attr("data-heroname"));
    });

    // Homepage banner click tracking
    $j(".billboard[data-heroname] a").each(function () {
        $j(this).click(function () {
            // Special handling for the MDRF dual banner
            var label = $j(this).closest(".billboard[data-heroname]").attr("data-heroname");
            if ($j(this).attr("data-heroLinkName"))
                label += " - " + $j(this).attr("data-heroLinkName");

            trackEventNoCallback("City Homepage - Billboard", "Click", label);
        });
	});

	// banner click tracking
	$j("a.banner[data-bannername]").click(function () {
		trackEventNoCallback("Banner", "Click", $j(this).attr("data-bannername"));
	});

    // Handling for COVID-19 Voting Info page
    $j("a#featuredContent.trackMyBallot, a#featuredContent.voterRegistration2020").click(function () { trackEventNoCallback("COVID-19 Voting Info Page Banners", "Click", $j(this).attr("data-heroname")); });

	// Homepage hero impression tracking
	$j("#featuredContent[data-heroname]").each(function () {
		if ($j(this).length) {
			trackEventNoCallback("City Homepage - Hero Image", "Impression", $j(this).attr("data-heroname"));
		}
	});

	// Banner impression tracking
	$j(".banner[data-bannername]").each(function () {
		if ($j(this).length) {
			trackEventNoCallback("Banner", "Impression", $j(this).attr("data-bannername"));
		}
	});	
/*** Homepage Hero Tracking End ***/

	//Brand img and text
	$j(".topNav .brand a").each(function () {
		$j(this).click(function (t) {
			trackEvent($j(this).attr("href"), "City Homepage - City Brand img/text ", "Click", $j(this).text().trim()), t.preventDefault();
		})
	});

	//Top Nav Flyout Links
	$j(".topNav .menu .bottom nav > ul > li .subMenu a").each(function () {
        $j(this).click(function (t) {
            if ($j(this).attr("target") === "_blank") {
                trackEventNoCallback("City Homepage - Top Nav Links", "Submenu Link Click", $j(this).text().trim()), t.preventDefault();
                window.open($j(this).attr("href"));
            }
            else
                trackEvent($j(this).attr("href"), "City Homepage - Top Nav Links", "Submenu Link Click", $j(this).text().trim()), t.preventDefault();
        });
	});
    $j(".deptNav .menu .bottom nav > ul > li .subMenu a").each(function () {
        $j(this).click(function (t) {
            if ($j(this).attr("target") === "_blank") {
                trackEventNoCallback("Department Homepage - Top Nav Links", "Submenu Link Click", $j(this).text().trim()), t.preventDefault();
                window.open($j(this).attr("href"));
            }
            else
                trackEvent($j(this).attr("href"), "Department Homepage - Top Nav Links", "Submenu Link Click", $j(this).text().trim()), t.preventDefault();
        });
    });

	//Quick Links Menu in Header
	$j(".topNav .menu .top .toolsMenu > ul > li.quickLinks .quickLinksMenu > ul > li a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "City Homepage - Subheader", "Click", $j(this).find("span").text()), t.preventDefault() }) });

	//Subscribe
	$j(".subscribe a").each(function () {
		$j(this).click(function (t) {
			trackEvent($j(this).attr("href"), "City Homepage - Subheader", "Click", "Subscribe"), t.preventDefault();
		})
	});

	//Google Translate (not working)
	$j(".translateMenu a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("City Homepage -  Subheader", "Click", "Google Translate");
		})
	});

	//Footer Quick Links
	$j("#bottomLinks a").each(function () {
		$j(this).click(function (t) {
			if ($j(this).attr("target") == "_blank") {
				trackEventNoCallback("City Homepage - Fat Footer", "Click", $j(this).text()), t.preventDefault();
				window.open($j(this).attr("href"));
			}
			else
				trackEvent($j(this).attr("href"), "City Homepage - Fat Footer", "Click", $j(this).text()), t.preventDefault();
		})
	});

	//Footer Social Buttons
	$j("footer .socialLinks a").each(function () { $j(this).click(function (t) { trackEventNoCallback("City Homepage - Footer Social Links", "Click", $j(this).attr('class')) }) });

	//Footer Links
	$j("#footer a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "City Homepage - Footer", "Click", $j(this).text()), t.preventDefault() }) });

	//Track FAQs (not tracking first one)
	$j(".faq > div.accordion h3[aria-expanded*='false']").each(function () { $j(this).click(function (t) { trackEventNoCallback("FAQ Expand", "Click", $j(this).find("div.accordionHeaderText").text()), t.preventDefault() }) });

	//Well Links
	$j(".wells a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Well Link", "Click", $j(this).text());
		})
	});

	//Pagination
	$j(".dataPager li a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Pagination", "Click", $j(this).text()), t.preventDefault() }) });

	//Back to Top button
	$j("a.btnBackToTop").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Back To Top", "Back To Top", "");
		})
	});

	//Mosaic Titles
	$j("#heroImages figure figcaption h3 a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Mosaic Tile", "Click", $j(this).text()), t.preventDefault() }) });

	//Search Icon
	$j("#wrapper main #btnNavQuickSearch").each(function () { $j(this).click(function (t) { trackEventNoCallback("City Homepage - Search", "Main Search", $j("#wrapper main #txtQuickSearch").val()), t.preventDefault() }) });

	//Coming Up View all
	$j("#eventSlider h3 a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "City Homepage - Coming Up", "Click", $j(this).text()), t.preventDefault() }) });

	//Coming Up Pagination
	$j("#eventSlider .cycle-pagers a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("City Homepage - Coming Up Pagination", "Click", $j(this).text());
		})
	});

	//Home Page News Control - Image click
	$j(".newsList .newsItem .newsLink .image a").each(function () {
		$j(this).click(function (t) {
			trackEvent($j(this).attr("href"), "City Homepage - News", "Click", $j(this).parent().siblings().find("a h2").text()), t.preventDefault();
		})
	});

	//Home Page News Control - Title click
	$j(".newsList .newsItem .newsLink .information a").each(function () {
		$j(this).click(function (t) {
			trackEvent($j(this).attr("href"), "City Homepage - News", "Click", $j(this).find("h2").text()), t.preventDefault();
		})
	});

	//Social Media Aggregator Filter buttons
	$j(".socialFeeds .socialFilters li .socialBtn").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Social Media Aggregator", "Click", "Filter - " + $j(this).attr("title")), t.preventDefault()
		})
	});

	//Social Media Aggregator - Show More Button
	var showMoreBtnClickNum = 1;
	$j(".socialFeeds #showMoreFeeds").each(function () { $j(this).click(function (t) { trackEventNoCallback("Social Media Aggregator", "Click", "Show More " + showMoreBtnClickNum), t.preventDefault(); showMoreBtnClickNum++; }) });

	//Service List Search
	$j("#services .servicesList input[type='submit']").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Service List - Search", "Click", $j("#services .servicesList .byKeyword #txtKeyword").val() + " / " + $j("#services .servicesList .byKeyword #ddlDepartment").find("option:selected").text() + " / " + $j("#services .servicesList .byKeyword #ResultsDDL").find("option:selected").text());
		})
	});

	//Service List Letter
	$j("#services .servicesList .byLetter a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Service List - Filter By Letter", "Click", $j(this).text()), t.preventDefault() }) });

	//Service List Online Button
	$j("#services .servicesList #OnlineButton").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Service List - Online Button", "Click", $j(this).text()), t.preventDefault() }) });

	//Service List Service
	$j("#services .servicesList .service h3 a").each(function () {
		$j(this).click(function (t) {
			if ($j(this).attr("target") == "_blank") {
				trackEventNoCallback("Service List - Service Link", "Click", $j(this).text()), t.preventDefault();
				window.open($j(this).attr("href"));
			}
			else
				trackEvent($j(this).attr("href"), "Service List - Service Link", "Click", $j(this).text()), t.preventDefault();
		})
	});

	//Service List Related department
	$j("#services .servicesList .departments a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Service List - Related Department", "Click", $j(this).text()), t.preventDefault() }) });

	//Service Detail Related department
	$j(".servicesDetail #relatedDepartmentsList #departmentLink").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Service Detail - Related Department", "Click", $j(this).text()), t.preventDefault() }) });

	//Service Detail Online Button
	$j(".servicesDetail #onlineLink").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Service Detail - Online Button", "Click", $j(this).text()), t.preventDefault() }) });

	// Want To List I Want To
	$j("#iwantto .iwanttoList .iwantto h3 a").each(function () {
		$j(this).click(function (t) {
			if ($j(this).attr("target") == "_blank") {
				trackEventNoCallback("I Want To List - I Want To Link", "Click", $j(this).text()), t.preventDefault();
				window.open($j(this).attr("href"));
			}
			else
				trackEvent($j(this).attr("href"), "I Want To List - I Want To Link", "Click", $j(this).text()), t.preventDefault();
		})
	});

	//I Want To List Related department
	$j("#iwantto .iwanttoList .departments a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "I Want To List - Related Department", "Click", $j(this).text()), t.preventDefault() }) });

	//I Want To Detail Related department
	$j(".iWantToDetail #RelatedDepartments a.online").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "I Want To Detail - Related Department", "Click", $j(this).attr("href")), t.preventDefault() }) });

	//I Want To List Search
	$j("#iwantto .iwanttoList input[type='submit']").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("I Want To List - Search", "Click", $j("#iwantto .iwanttoList .byKeyword #txtKeyword").val() + " / " + $j("#iwantto .iwanttoList .byKeyword #ddlDepartment").find("option:selected").text() + " / " + $j("#iwantto .iwanttoList .byKeyword #ResultsDDL").find("option:selected").text());
		})
	});

	//Department Detail Foldable
	$j(".departmentDetail #content .relatedInfo section h2").each(function () { $j(this).click(function (t) { trackEventNoCallback("Department Detail - Foldable", "Click", $j(this).text()), t.preventDefault() }) });

	//Department Related service
	$j(".departmentDetail #content .relatedInfo section #ServiceList a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Department Detail - Related Service", "Click", $j(this).text()), t.preventDefault() }) });

	//Event Tag Click
	$j("a[title='Event Tag']").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Calendar List - Event Tag", "Click", $j(this).text()), t.preventDefault() }) });

	// Useful Docs and Resouces
	$j(".departmentDetail #documentList #documentLink").each(function () {
		$j(this).click(function (t) {
			if ($j(this).attr("target") == "_blank") {
				trackEventNoCallback("Department Detail - Related Document", "Click", $j(this).text()), t.preventDefault();
				window.open($j(this).attr("href"));
			}
			else
				trackEvent($j(this).attr("href"), "Department Detail - Related Document", "Click", $j(this).text()), t.preventDefault();
		})
    });

    // Related Departments
    $j("ul[id$='relatedDepartmentList'] li a").on("click", function () { trackEventNoCallback("Related Departments Box", "Toggle", $j(this).text()); });

	//City Calendar View
	$j(".calendar .eventFilter .viewRange .buttonRow input").each(function () { $j(this).click(function (t) { trackEventNoCallback("Calendar List - View Change", "Click", $j(this).val()), t.preventDefault() }) });

	//Mini Calendar Date click
	$j(".calendar .eventFilter .calGrid tr td a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Calendar List - Day Navigation", "Click", $j(this).text() + " " + $j(".calendar .eventFilter .calPager span.title").text()), t.preventDefault() }) });

	//Mini Calendar Prev and Next buttons
	$j(".calendar .eventFilter .calPager a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "Calendar List - Month Navigation", "Click", $j(this).text()), t.preventDefault() }) });

	//Calendar Search
	$j(".calendar .eventFilter .filterBy input[type='submit']").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Calendar List - Search", "Click", $j("#calendar .eventFilter .filterBox #bodycontent_0_ddlDepartment").find("option:selected").text() + " / " + $j("#calendar .eventFilter .filterBox #bodycontent_0_ddlTopic").find("option:selected").text() + " / " + $j("#calendar .eventFilter .filterBox #bodycontent_0_ddlNeighborhood").find("option:selected").text() + " / " + $j("#calendar .eventFilter .filterBox #keyword").val());
		})
	});

	//Calendar List - Subscribe to Calendar Feed
	$j(".calendar #subscribeRss input[type='submit']").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Calendar List - Subscribe RSS", "Click", $j(".mainPageHeader > h1").text());
		})
	});

	//Calendar Detail - Add to Calendar
	$j(".detailPage #addToCalendar input[type='submit']").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Calendar Detail - Add to Calendar", "Click", $j(".mainPageHeader > h1").text());
		})
	});

	//// Track document link clicks (new window)
	//$j("a[href$='.pdf'][target='_blank'], a[href$='.doc'][target='_blank'], a[href$='.docx'][target='_blank'], a[href$='.dotm'][target='_blank'], a[href$='.xlsx'][target='_blank'], a[href$='.xls'][target='_blank']").each(function () {
	//	$j(this).click(function (t) {
	//		trackEventNoCallback("Document Links", "Click", $j(this).attr("href")), t.preventDefault()
	//	})
	//});

	//// Track document link clicks (same window)
	//$j("a[href$='.pdf'], a[href$='.doc'], a[href$='.docx'], a[href$='.dotm'], a[href$='.xlsx'], a[href$='.xls']").not("[target]").each(function () {
	//	$j(this).click(function (t) {
	//		trackEvent($j(this).attr("href"), "Document Links", "Click", $j(this).attr("href")), t.preventDefault()
	//	})
	//});

	//Publications Search
	$j(".documentsFilter input[type='submit']").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Publications List - Search", "Click", $j(".documentsFilter select[id*='ddlDocumentType']").find("option:selected").text() + " / " + $j(".documentsFilter select[id*='ddlDocumentCategory']").find("option:selected").text() + " / " + $j(".documentsFilter #Keyword").val());
		})
	});

	//Project Showcase
	$j("#projectShowcase #showcaseList .showcase a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Project Showcase", "Click", $j(this).find("h3").text());
		})
	});

	//Home Resources
	$j(".resources .resourceList a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Resources", "Click", $j(this).find(".title").text());
		})
    });

	//Equity and Inclusion Billboard
	$j(".equityInclusionDash a").each(function () { $j(this).click(function (t) { trackEvent($j(this).attr("href"), "City Homepage - Billboard", "Click", "Interactive Equity and Inclusion Dashboard"), t.preventDefault() }) });

	//JIRA Feedback Button
	$j("#btnFeedback").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("JIRA Feeback Button", "Click", "Open");
		})
	});

	//JIRA Feedback Button Close Dialog
	$j(".dialog-button-panel .cancel").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("JIRA Feeback Button", "Click", "Close");
		})
	});

	//Property Database Actions
	//Basic Search
	$j("#PropertyDBSearch #BasicSearchPanel INPUT[type = 'submit']").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Property Database", "Click", "Basic Search");
		})
	});

	//Advanced Search
	$j("#PropertyDBSearch #AdvancedSearchPanel INPUT[type = 'submit']").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Property Database", "Click", "Advanced Search");
		})
	});

	// Moving Van Permit Application link click on I Want To page
	if (top.location.pathname == "/iwantto/applyforamovingvanpermit") {
		$j("#formsAndDocuments ul li a").first().click(function () {
			trackEventNoCallback("Moving Van Permit Application", "Click", "");
		});
	}

	// Subscribe Page - Subscribe Button Click
	$j("section.mailSubscriptionList .btn").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Subscription Page - Subscribe Button", "Click", $j(this).siblings("h3").text());
		});
	});

	// Subscribe Page - Filter/Reset Button Click
	$j("section.mailSubscriptionFilter .btnContainer a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Subscription Page - Filter Buttons", "Click", $j(this).text());
		});
	});

	// Subscribe Page - Filter Checkbox Select
	$j("section.mailSubscriptionFilter label input[type='checkbox']").each(function () {
		$j(this).change(function () {
			if (this.checked) {
				trackEventNoCallback("Subscription Page - Filter Condition", "Select", $j(this).parent().parent().siblings("h3").text() + " /" + $j(this).parent().text());
			}
		});
	});

	// Report an Issue Button on CC Page
	$j(".cc-report a").click(function (t) {
		trackEventNoCallback("Commonwealth Connect Report Button", "Click", window.location.href);
	});

/*** Snow Center Tracking ***/
	//Navigation
	$j(".snowcenter2018 .navigation .primaryNav a").click(function (t) {
		trackEventNoCallback("Snow Center - Top Navigation Links", "Click", $j(this).text());
	});

	//Mobile Navigation
	$j(".snowcenter2018 .navigation .ddlPrimaryNav").change(function (t) {
		trackEventNoCallback("Snow Center - Top Navigation Links Mobile", "Click", $j(this).find("option:selected").text());
	});

	//Current Status cards
	$j(".currentStatus .cardContainer .card").click(function (t) {
		trackEventNoCallback("Snow Center - Current Status Card", "Click", $j(this).find(".title").text());
	});

	//Transportation cards
	$j(".snowcenter2018 #content .transportation .card").click(function (t) {
		trackEventNoCallback("Snow Center - Transportation Card", "Click", $j(this).find(".title").text());
	});

	//Transportation cards - More Details Link
	$j(".snowcenter2018 #content .transportation .card a").click(function (t) {
		t.stopPropagation();
		trackEventNoCallback("Snow Center - " + $j(this).parent().siblings(".title").text() + " Transportation Card Link", "Click", $j(this).text().trim());
	});

	//Parking Search
	$j(".snowcenter2018 .parking .search .button").click(function (t) {
		trackEventNoCallback("Snow Center - Parking Search", "Click", $j(".snowcenter2018 .parking .search input").val());
	});

	$j(".snowcenter2018 .parking .search input").keypress(function (t) {
		if (t.keyCode == 13) {
			trackEventNoCallback("Snow Center - Parking Search", "Keypress", $j(".snowcenter2018 .parking .search input").val());
		}
	});

	//Report Links
	$j(".snowcenter2018 #content .streetsSidewalks .reportLinkContainer .reportLink").click(function (t) {
		trackEventNoCallback("Snow Center - Report Buttons", "Click", $j(this).text());
	});

	//Resource Tabs
	$j(".snowcenter2018 #content .resourcesTabs > ul > li a").click(function (t) {
		trackEventNoCallback("Snow Center - Resource Tabs", "Click", $j(this).text());
	});

	//All links
	$j(".snowcenter2018 #content a").click(function (t) {
		trackEventNoCallback("Snow Center - Links", "Click", $j(this).text());
	});
/*** Snow Center Tracking ***/

    // Featured hero link click
    $j(".featuredHeroesList a").each(function () {
        $j(this).click(function (t) {
            trackEventNoCallback("Featured Heroes", "Click", $j(this).find("div.text h2").text());
        });
	});

/*** 19th Amendment Page ***/
	$j(".nineteenthAmendmentPage .featuredEvent a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("19th Amendment Page - Resource Button", "Click", $j(this).text());
		});
	});

	$j(".nineteenthAmendmentPage .rightRail .expandable a").each(function () {
		$j(this).click(function (t) {
			if($j(this).parent().attr("class") == "active")
				trackEventNoCallback("19th Amendment Page - Contact", "Click", $j(this).text());
		});
	});

	$j(".nineteenthAmendmentPage .bookList .book a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("19th Amendment Page - Books", "Click", $j(this).attr("href"));
		});
	});
/*** 19th Amendment Page ***/

	/* Multi-Language Bar */
	$j("#multilingualHelpBar a").each(function () {
		$j(this).click(function (t) {
			trackEventNoCallback("Multi-Language Bar", "Click", $j(this).attr("data-lang"));
		});
	});

	//Multi-Lingual Help Links
	$j(".multiLingualHelpLinks a").each(function () {
		$j(this).click(function (t) {
			//trackEventNoCallback("Multi-Language Help Links", "Click", $j(this).attr("data-docname"));
			trackEvent($j(this).attr("href"), "Multi-Language Help Links", "Click", $j(this).closest("section").find("h2").attr("title") + " - " + $j(this).attr("data-docname")), t.preventDefault();
		});
    });
/* Multi-Language Bar */

    // View Data Center (COVID-19) button
    $j(".dataCenterButton").each(function () {
        $j(this).click(function (t) {
            trackEventNoCallback("COVID-19 Case Count Button", "Click", $j(this).attr("href"));
        });
	});

	// Track the page URL whenever a user executes a print action
	window.onafterprint = (event) => {
		trackEventNoCallback("Page Printing", "Print", window.location.href);
    };

    // USWDS Banner clicks
    $j(".usa-banner button").click(function (t) {
        if ($j(this).attr("aria-expanded") == "false")
            trackEventNoCallback("USWDS Security Banner", "Click", "Expand");
        else
            trackEventNoCallback("USWDS Security Banner", "Click", "Collapse");
    });
});