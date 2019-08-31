(function($){$(document).ready(function(){var $gallery=$('.njg-jg-gallery'),$item=$('.njg-jg-item');if($gallery.length>0&&$item.length>0){$gallery.photoswipe({shareButtons:[{id:'facebook',label:'Share on Facebook',url:'https://www.facebook.com/sharer/sharer.php?u={{image_url}}'},{id:'twitter',label:'Tweet',url:'https://twitter.com/intent/tweet?&url={{url}}'},{id:'pinterest',label:'Pin it',url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}'},{id:'download',label:'Download image',url:'{{raw_image_url}}',download:1}]})}})}(jQuery))

			var handlewebp = false;
			function cwebp(f, callback) {
				if(!handlewebp) callback(f, false);
				var kTestImages = {
					lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
					lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
					alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
					animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
				};
				var img = new Image();
				img.onload = function () {
					var result = (img.width > 0) && (img.height > 0);
					callback(f, result);
				};
				img.onerror = function () {
					callback(f, false);
				};
				img.src = "data:image/webp;base64," + kTestImages[f];
			}

			$reqCols = window.reqCols ? window.reqCols : 1;
			$reqHeight = window.reqHeight ? window.reqHeight : 160;
                        $maxRowHeight = window.maxRowHeight ? window.maxRowHeight : 600;
			( function ($) {

					function do_gallery(){
						$('.njg-optim').each(function(){
							var el = $(this);
							if(el.prop('complete') || el.prop('naturalWidth')>= el.attr('width')){
								el.attr('data-skip', '1');
							}else
el.attr('src',el.data('error-src'));
								//el.attr('src','data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
						});
						$('.njg-jg-gallery.main-image .njg-jg-item').each(function(){
							var $item = $(this);
									
			$item.each(function () {
				$(this).on('mouseenter mouseleave', function (e) {
					var $this = $(this);

					if (e.type === 'mouseenter') {
						$this.find('.caption').addClass('caption-visible');
					}

					if (e.type === 'mouseleave') {
						$this.find('.caption').removeClass('caption-visible');
					}
				});
			});
		
								});
						var $gallery = $('.njg-jg-gallery:not(.main-image)'),
							$item = $gallery.find('.njg-jg-item');

						if ($gallery.length > 0 && $item.length > 0) {
							cwebp('lossy',function(f,webp){
								$gallery.on('jg.complete', function (e) {
											
			$item.each(function () {
				$(this).on('mouseenter mouseleave', function (e) {
					var $this = $(this);

					if (e.type === 'mouseenter') {
						$this.find('.caption').addClass('caption-visible');
					}

					if (e.type === 'mouseleave') {
						$this.find('.caption').removeClass('caption-visible');
					}
				});
			});
		
										}).justifiedGallery({
									lastRow: 'justify',
									captions: false,
									margins: 3,
									rowHeight: $reqHeight,
									maxRowHeight: $maxRowHeight,
									thumbnailPath: function (currentPath, width, height, image) {
										if (typeof $(image).data('skip') === 'undefined' || !($(image).data('skip'))) {
											var srcset = $(image).data('srcset');
											if (typeof $(image).data('srcset') === 'undefined' || !srcset) {
												return currentPath;
											}

											$(image).attr('width', width);
											$(image).attr('height', height);

											if ($(image).length > 0 && srcset.length > 0) {
												var path,
													sizes = [],
													sizesTemp = [],
													urls = srcset.split(",");

												if (urls.length > 0) {
													for (i = 0; i < urls.length; i++) {
														var url, sizeW,
															item = urls[i].trim().split(" ");

														if (typeof item[0] != 'undefined' && typeof item[1] != 'undefined') {
															var sizeW = item[1].replace('w', '');
															sizesTemp[sizeW] = {
																'width': item[1].replace('w', ''),
																'url': item[0]
															};
														}
													}

													for (i = 0; i < sizesTemp.length; i++) {
														if (sizesTemp[i]) {
															sizes.push(sizesTemp[i])
														}
													}
												}

												var _changed = false;
												for (i = 0; i < sizes.length; i++) {
													if (sizes[i].width >= width) {
														currentPath = sizes[i].url;
														_changed = true;
														break;
													}
												}

												if (!_changed && sizes.length) {
													currentPath = sizes[sizes.length - 1].url;
												} else $(image).data('src');
											}
										}else return $(image).data('src');

										if(handlewebp && webp) {
											const basep = currentPath.split('.').slice(0, -1).join('.');
											if(currentPath != $(image).data('orig-src')) {
												currentPath = basep + ".webp";
											}else{
												currentPath = basep + "-"+$(image).attr('atd')+".webp";
											}
											currentPath = currentPath.replace(_wpimbase,_aimbase);
										}

										$(image).attr('src', currentPath);

										return currentPath;
									}
								});
							});
						}
					}

					$(document).ready(function () {
						do_gallery();
					});

				}(jQuery)
			);
