/* feedreader.js
    ####################################################
    Please note that commenting is at a minimum because
    the tests should be readable.
    Last reviewer suggested comment clean up
    ####################################################
 */
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('URLs are defined not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

         it('Names are defined and not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    describe('The Menu', function() {
        var $body = $('body');

         it('Hides menu by default', function(){
            expect($body.hasClass('menu-hidden')).toBe(true);
        });

          it('toggles menu visibility on click', function(){
            var menu = $('.menu-icon-link');
            // test that first click removes menu-hidden class
            menu.click();
            expect($body.hasClass('menu-hidden')).toBeFalsy();
            // test that second click add menu-hidden class back on
            menu.click();
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {

         //Create before each with done to perform asynchronous test
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });

        });
        // pass done in and call at end to let test know about asynchronous
        // check that entries is not empty
        it('has initial entries ', function(done){
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var feed;
        var newFeed;

        //Create before each with done to perform asynchronous test
        beforeEach(function(done) {
            loadFeed(0, function() {
                // store entries for feed 0
                feed = $('.feed').html();
                done();
            });
        });

        beforeEach(function(done) {
            loadFeed(1, function() {
                    // store new loaded entries(feed1)
                    newFeed = $('.feed').html();
                    done();
                });
            });

        // check that last feed(feed) entries does not equal newFeed entries
        it('has new content when new feed loaded', function(done) {
            console.log('feed = ' + feed);
            console.log('newFeed = ' + newFeed);
            expect(feed).not.toEqual(newFeed);
            done();
        });
    });
}());
